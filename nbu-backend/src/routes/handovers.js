const express = require('express');
const router = express.Router();
const Handover = require('../models/Handover');

// GET handovers for a neonate
router.get('/neonate/:id', async (req, res) => {
  try {
    const handovers = await Handover.find({ neonate: req.params.id })
      .sort({ createdAt: -1 })
      .populate('nurseOnDuty', 'name')
      .populate('clinicalLead', 'name');
    res.json({ success: true, handovers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET recent handovers
router.get('/recent', async (req, res) => {
  try {
    const handovers = await Handover.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('neonate', 'name hospitalNumber')
      .populate('nurseOnDuty', 'name');
    res.json({ success: true, handovers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// CREATE handover
router.post('/', async (req, res) => {
  try {
    const handover = new Handover(req.body);
    await handover.save();
    res.json({ success: true, handover });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
