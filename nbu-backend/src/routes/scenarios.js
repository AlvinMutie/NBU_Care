const express = require('express');
const router = express.Router();
const Scenario = require('../models/Scenario');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const scenarios = await Scenario.find();
    res.json({ success: true, data: scenarios });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', protect, authorize('Nursing In-Charge', 'Consultant Pediatrician'), async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const scenario = await Scenario.create(req.body);
    res.status(201).json({ success: true, data: scenario });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
