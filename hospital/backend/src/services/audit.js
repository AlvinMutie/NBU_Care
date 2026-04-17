const { exec } = require('../db/pool');

async function writeAudit({
  actorUserId,
  action,
  entityType,
  entityId,
  before,
  after,
  ip,
  userAgent,
}) {
  await exec(
    `INSERT INTO audit_log
      (actor_user_id, action, entity_type, entity_id, before_json, after_json, ip, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      actorUserId ?? null,
      action,
      entityType,
      entityId ?? null,
      before ? JSON.stringify(before) : null,
      after ? JSON.stringify(after) : null,
      ip ?? null,
      userAgent ?? null,
    ],
  );
}

module.exports = { writeAudit };

