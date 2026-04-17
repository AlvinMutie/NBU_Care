const express = require('express');
const { z } = require('zod');
const { exec } = require('../db/pool');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const favSchema = z.object({
  entityType: z.enum(['FLASHCARD', 'SCENARIO']),
  entityId: z.number().int().positive(),
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const body = favSchema.parse(req.body);
    await exec(
      'INSERT IGNORE INTO favorites (user_id, entity_type, entity_id) VALUES (?, ?, ?)',
      [req.user.id, body.entityType, body.entityId],
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    if (err?.name === 'ZodError') {
      err.statusCode = 400;
      err.code = 'VALIDATION_ERROR';
      err.details = err.errors;
    }
    next(err);
  }
});

router.delete('/', requireAuth, async (req, res, next) => {
  try {
    const body = favSchema.parse(req.body);
    await exec('DELETE FROM favorites WHERE user_id = ? AND entity_type = ? AND entity_id = ?', [
      req.user.id,
      body.entityType,
      body.entityId,
    ]);
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

module.exports = router;

