const bcrypt = require('bcrypt');
const { query, exec } = require('../db/pool');

async function bootstrapAdmin() {
  const username = process.env.ADMIN_BOOTSTRAP_USERNAME || 'admin';
  const fullName = process.env.ADMIN_BOOTSTRAP_FULLNAME || 'NBU Administrator';
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!password || password.length < 10) {
    throw new Error(
      'ADMIN_BOOTSTRAP_PASSWORD must be set and at least 10 characters to bootstrap admin user.',
    );
  }

  const existing = await query('SELECT id, username, role, active FROM users WHERE username = ?', [
    username,
  ]);

  const passwordHash = await bcrypt.hash(password, 12);

  if (existing.length === 0) {
    await exec(
      'INSERT INTO users (username, full_name, password_hash, role, active) VALUES (?, ?, ?, ?, 1)',
      [username, fullName, passwordHash, 'ADMIN'],
    );
    return { created: true };
  }

  const user = existing[0];
  if (user.role !== 'ADMIN' || user.active !== 1) {
    await exec('UPDATE users SET role = ?, active = 1 WHERE id = ?', ['ADMIN', user.id]);
  }

  // Always rotate bootstrap admin password on startup (LAN deploy convenience).
  await exec('UPDATE users SET full_name = ?, password_hash = ? WHERE id = ?', [
    fullName,
    passwordHash,
    user.id,
  ]);

  return { created: false };
}

module.exports = { bootstrapAdmin };

