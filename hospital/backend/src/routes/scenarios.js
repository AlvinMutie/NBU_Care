const express = require('express');
const { z } = require('zod');
const { query, exec } = require('../db/pool');
const { requireAuth, requireRole } = require('../middleware/auth');
const { writeAudit } = require('../services/audit');

const router = express.Router();

function toBool(v) {
  if (v === true || v === 'true' || v === 1 || v === '1') return true;
  return false;
}

function mapScenarioRow(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    problemText: row.problem_text,
    solutionSteps: JSON.parse(row.solution_steps_json),
    formulasText: row.formulas_text,
    criticalWarnings: row.critical_warnings,
    isFavorite: row.is_favorite === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const scenarioUpsertSchema = z.object({
  title: z.string().min(1).max(200),
  category: z.enum(['ROUTINE', 'CLINICAL', 'CRITICAL', 'CALCULATIONS']),
  problemText: z.string().min(1),
  solutionSteps: z.array(z.string().min(1).max(400)).min(1).max(12),
  formulasText: z.string().optional().nullable(),
  criticalWarnings: z.string().optional().nullable(),
  interactiveSchema: z.any().optional().nullable(),
});

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const queryText = (req.query.query || '').toString().trim();
    const category = (req.query.category || '').toString().trim();
    const favoritesOnly = toBool(req.query.favoritesOnly);

    const where = [];
    const params = [];

    if (category) {
      where.push('s.category = ?');
      params.push(category);
    }

    if (favoritesOnly) {
      where.push(
        `EXISTS (SELECT 1 FROM favorites fav WHERE fav.user_id = ? AND fav.entity_type = 'SCENARIO' AND fav.entity_id = s.id)`,
      );
      params.push(req.user.id);
    }

    if (queryText) {
      where.push('MATCH(s.title, s.problem_text, s.formulas_text, s.critical_warnings) AGAINST (? IN NATURAL LANGUAGE MODE)');
      params.push(queryText);
    }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const rows = await query(
      `
      SELECT
        s.*,
        EXISTS(
          SELECT 1 FROM favorites fav
          WHERE fav.user_id = ? AND fav.entity_type = 'SCENARIO' AND fav.entity_id = s.id
        ) AS is_favorite
      FROM scenarios s
      ${whereSql}
      ORDER BY s.updated_at DESC
      LIMIT 500
      `,
      [req.user.id, ...params],
    );

    res.json({ scenarios: rows.map(mapScenarioRow) });
  } catch (err) {
    next(err);
  }
});

router.post('/', requireAuth, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const body = scenarioUpsertSchema.parse(req.body);
    const result = await exec(
      `INSERT INTO scenarios
        (title, category, problem_text, solution_steps_json, formulas_text, critical_warnings, interactive_schema_json, created_by, updated_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.title,
        body.category,
        body.problemText,
        JSON.stringify(body.solutionSteps),
        body.formulasText ?? null,
        body.criticalWarnings ?? null,
        body.interactiveSchema ? JSON.stringify(body.interactiveSchema) : null,
        req.user.id,
        req.user.id,
      ],
    );

    await writeAudit({
      actorUserId: req.user.id,
      action: 'SCENARIO_CREATED',
      entityType: 'SCENARIO',
      entityId: result.insertId,
      before: null,
      after: body,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    req.app.get('io').emit('scenarios:changed', { type: 'created', id: result.insertId });
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

    const body = scenarioUpsertSchema.parse(req.body);
    const beforeRows = await query('SELECT * FROM scenarios WHERE id = ?', [id]);
    if (beforeRows.length === 0) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Scenario not found' } });
    }

    await exec(
      `UPDATE scenarios
       SET title=?, category=?, problem_text=?, solution_steps_json=?, formulas_text=?, critical_warnings=?, interactive_schema_json=?, updated_by=?
       WHERE id=?`,
      [
        body.title,
        body.category,
        body.problemText,
        JSON.stringify(body.solutionSteps),
        body.formulasText ?? null,
        body.criticalWarnings ?? null,
        body.interactiveSchema ? JSON.stringify(body.interactiveSchema) : null,
        req.user.id,
        id,
      ],
    );

    await writeAudit({
      actorUserId: req.user.id,
      action: 'SCENARIO_UPDATED',
      entityType: 'SCENARIO',
      entityId: id,
      before: beforeRows[0],
      after: body,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    req.app.get('io').emit('scenarios:changed', { type: 'updated', id });
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

    const beforeRows = await query('SELECT * FROM scenarios WHERE id = ?', [id]);
    if (beforeRows.length === 0) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Scenario not found' } });
    }

    await exec('DELETE FROM scenarios WHERE id = ?', [id]);

    await writeAudit({
      actorUserId: req.user.id,
      action: 'SCENARIO_DELETED',
      entityType: 'SCENARIO',
      entityId: id,
      before: beforeRows[0],
      after: null,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    req.app.get('io').emit('scenarios:changed', { type: 'deleted', id });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

