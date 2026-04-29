const express = require('express');
const router = express.Router();
// For now, reuse logs or provide a basic audit endpoint
const AuditLog = require('../models/AuditLog');

// Get audit logs
router.get('/', async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(100);
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
