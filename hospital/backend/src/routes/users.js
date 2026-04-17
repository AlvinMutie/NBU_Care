const express = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { exec, query } = require('../db/pool');
const { requireAuth, requireRole } = require('../middleware/auth');
const { writeAudit } = require('../services/audit');

const router = express.Router();

const createUserSchema = z.object({
  username: z.string().min(1).max(100),
  fullName: z.string().min(1).max(160),
  password: z.string().min(10).max(200),
  role: z.enum(['NURSE', 'ADMIN']).default('NURSE'),
});

router.post('/', requireAuth, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const body = createUserSchema.parse(req.body);
    const existing = await query('SELECT id FROM users WHERE username = ?', [body.username]);
    if (existing.length > 0) {
      return res.status(409).json({
        error: { code: 'CONFLICT', message: 'Username already exists' },
      });
    }

    const passwordHash = await bcrypt.hash(body.password, 12);
    const result = await exec(
      'INSERT INTO users (username, full_name, password_hash, role, active) VALUES (?, ?, ?, ?, 1)',
      [body.username, body.fullName, passwordHash, body.role],
    );

    await writeAudit({
      actorUserId: req.user.id,
      action: 'USER_CREATED',
      entityType: 'USER',
      entityId: result.insertId,
      before: null,
      after: { username: body.username, fullName: body.fullName, role: body.role, active: 1 },
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    return res.status(201).json({
      user: { id: result.insertId, username: body.username, fullName: body.fullName, role: body.role },
    });
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

