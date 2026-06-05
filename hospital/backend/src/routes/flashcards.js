const express = require('express');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const { z } = require('zod');
const { query, exec } = require('../db/pool');
const { requireAuth, requireRole } = require('../middleware/auth');
const { writeAudit } = require('../services/audit');

const router = express.Router();

function toBool(v) {
  if (v === true || v === 'true' || v === 1 || v === '1') return true;
  return false;
}

function mapFlashcardRow(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    icon: row.icon,
    whenToPerform: row.when_to_perform,
    steps: JSON.parse(row.steps_json),
    criticalWarnings: row.critical_warnings,
    tips: row.tips,
    image: row.image_id
      ? {
          id: row.image_id,
          url: `/uploads/${row.file_name}`,
        }
      : null,
    isFavorite: row.is_favorite === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const flashcardUpsertSchema = z.object({
  title: z.string().min(1).max(180),
  category: z.enum(['ROUTINE', 'CLINICAL', 'CRITICAL', 'CALCULATIONS']),
  icon: z.string().max(80).optional().nullable(),
  whenToPerform: z.string().min(1),
  steps: z.array(z.string().min(1).max(300)).min(1).max(5),
  criticalWarnings: z.string().optional().nullable(),
  tips: z.string().optional().nullable(),
});

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const queryText = (req.query.query || '').toString().trim();
    const category = (req.query.category || '').toString().trim();
    const favoritesOnly = toBool(req.query.favoritesOnly);

    const where = [];
    const params = [];

    if (category) {
      where.push('f.category = ?');
      params.push(category);
    }

    if (favoritesOnly) {
      where.push(
        `EXISTS (SELECT 1 FROM favorites fav WHERE fav.user_id = ? AND fav.entity_type = 'FLASHCARD' AND fav.entity_id = f.id)`,
      );
      params.push(req.user.id);
    }

    if (queryText) {
      where.push('MATCH(f.title, f.when_to_perform, f.critical_warnings, f.tips) AGAINST (? IN NATURAL LANGUAGE MODE)');
      params.push(queryText);
    }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const rows = await query(
      `
      SELECT
        f.*,
        i.file_name,
        EXISTS(
          SELECT 1 FROM favorites fav
          WHERE fav.user_id = ? AND fav.entity_type = 'FLASHCARD' AND fav.entity_id = f.id
        ) AS is_favorite
      FROM flashcards f
      LEFT JOIN images i ON i.id = f.image_id
      ${whereSql}
      ORDER BY f.updated_at DESC
      LIMIT 500
      `,
      [req.user.id, ...params],
    );

    res.json({ flashcards: rows.map(mapFlashcardRow) });
  } catch (err) {
    next(err);
  }
});

router.post('/', requireAuth, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const body = flashcardUpsertSchema.parse(req.body);
    const result = await exec(
      `INSERT INTO flashcards
        (title, category, icon, when_to_perform, steps_json, critical_warnings, tips, created_by, updated_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.title,
        body.category,
        body.icon ?? null,
        body.whenToPerform,
        JSON.stringify(body.steps),
        body.criticalWarnings ?? null,
        body.tips ?? null,
        req.user.id,
        req.user.id,
      ],
    );

    await writeAudit({
      actorUserId: req.user.id,
      action: 'FLASHCARD_CREATED',
      entityType: 'FLASHCARD',
      entityId: result.insertId,
      before: null,
      after: body,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    req.app.get('io').emit('flashcards:changed', { type: 'created', id: result.insertId });
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    if (err?.name === 'ZodError') {
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      err.details = err.errors;
    }
    next(err);
  }
});

router.put('/:id', requireAuth, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid id' } });
    }

    const body = flashcardUpsertSchema.parse(req.body);
    const beforeRows = await query('SELECT * FROM flashcards WHERE id = ?', [id]);
    if (beforeRows.length === 0) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Flashcard not found' } });
    }

    await exec(
      `UPDATE flashcards
       SET title=?, category=?, icon=?, when_to_perform=?, steps_json=?, critical_warnings=?, tips=?, updated_by=?
       WHERE id=?`,
      [
        body.title,
        body.category,
        body.icon ?? null,
        body.whenToPerform,
        JSON.stringify(body.steps),
        body.criticalWarnings ?? null,
        body.tips ?? null,
        req.user.id,
        id,
      ],
    );

    await writeAudit({
      actorUserId: req.user.id,
      action: 'FLASHCARD_UPDATED',
      entityType: 'FLASHCARD',
      entityId: id,
      before: beforeRows[0],
      after: body,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    req.app.get('io').emit('flashcards:changed', { type: 'updated', id });
    res.json({ ok: true });
  } catch (err) {
    if (err?.name === 'ZodError') {
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      err.details = err.errors;
    }
    next(err);
  }
});

router.delete('/:id', requireAuth, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid id' } });
    }

    const beforeRows = await query('SELECT * FROM flashcards WHERE id = ?', [id]);
    if (beforeRows.length === 0) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Flashcard not found' } });
    }

    await exec('DELETE FROM flashcards WHERE id = ?', [id]);

    await writeAudit({
      actorUserId: req.user.id,
      action: 'FLASHCARD_DELETED',
      entityType: 'FLASHCARD',
      entityId: id,
      before: beforeRows[0],
      after: null,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    req.app.get('io').emit('flashcards:changed', { type: 'deleted', id });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

const maxUploadBytes = Number(process.env.MAX_UPLOAD_MB || 5) * 1024 * 1024;
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, process.env.UPLOAD_DIR || 'uploads'),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`);
    },
  }),
  limits: { fileSize: maxUploadBytes },
});

router.post('/:id/image', requireAuth, requireRole('ADMIN'), upload.single('image'), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Invalid id' } });
    }
    if (!req.file) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'No file uploaded' } });
    }

    const sha256 = crypto.createHash('sha256');
    sha256.update(require('fs').readFileSync(req.file.path));

    const imgResult = await exec(
      `INSERT INTO images
        (original_name, file_name, mime_type, file_size_bytes, sha256, storage_path, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        req.file.originalname,
        req.file.filename,
        req.file.mimetype,
        req.file.size,
        sha256.digest('hex'),
        req.file.path,
        req.user.id,
      ],
    );

    const beforeRows = await query('SELECT image_id FROM flashcards WHERE id = ?', [id]);
    if (beforeRows.length === 0) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Flashcard not found' } });
    }

    await exec('UPDATE flashcards SET image_id = ?, updated_by = ? WHERE id = ?', [
      imgResult.insertId,
      req.user.id,
      id,
    ]);

    await writeAudit({
      actorUserId: req.user.id,
      action: 'FLASHCARD_IMAGE_SET',
      entityType: 'FLASHCARD',
      entityId: id,
      before: { imageId: beforeRows[0].image_id },
      after: { imageId: imgResult.insertId },
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    req.app.get('io').emit('flashcards:changed', { type: 'updated', id });
    res.status(201).json({ imageId: imgResult.insertId, url: `/uploads/${req.file.filename}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

