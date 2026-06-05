const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');
const auth = require('../middleware/auth');

// Create a new log
router.post('/', auth.protect, async (req, res) => {
  try {
    const { action, type, status } = req.body;
    const newLog = new AuditLog({
      action,
      type,
      status: status || 'Checked',
      user: req.user.id
    });
    
    await newLog.save();
    res.json({ success: true, data: newLog });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get recent logs (for Admin Dashboard)
router.get('/recent', auth.protect, async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate('user', 'name role')
      .sort({ createdAt: -1 })
      .limit(10);
      
    res.json({ success: true, data: logs });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
