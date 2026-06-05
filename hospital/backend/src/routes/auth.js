const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { query } = require('../db/pool');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const loginSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1).max(200),
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    const users = await query(
      'SELECT id, username, full_name, password_hash, role, active FROM users WHERE username = ?',
      [username],
    );
    if (users.length === 0) {
      return res
        .status(401)
        .json({ error: { code: 'UNAUTHORIZED', message: 'Invalid username or password' } });
    }
    const user = users[0];
    if (user.active !== 1) {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Account disabled' } });
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res
        .status(401)
        .json({ error: { code: 'UNAUTHORIZED', message: 'Invalid username or password' } });
    }

    const token = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          fullName: user.full_name,
          role: user.role,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '12h' },
    );

    return res.json({
      token,
      user: { id: user.id, username: user.username, fullName: user.full_name, role: user.role },
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

router.get('/me', requireAuth, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;

