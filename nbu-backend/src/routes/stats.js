const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Neonate = require('../models/Neonate');
const Handover = require('../models/Handover');

// Get unit statistics
router.get('/', async (req, res) => {
  try {
    const [totalStaff, totalNeonates, totalHandovers] = await Promise.all([
      User.countDocuments({ verificationStatus: 'Verified' }),
      Neonate.countDocuments(),
      Handover.countDocuments()
    ]);

    res.json({
      success: true,
      totalStaff,
      totalNeonates,
      totalHandovers,
      lastUpdated: new Date()
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
