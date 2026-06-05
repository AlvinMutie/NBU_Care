const express = require('express');
const router = express.Router();
const Neonate = require('../models/Neonate');

// GET all active neonates
router.get('/', async (req, res) => {
  try {
    const neonates = await Neonate.find({ active: true });
    res.json({ success: true, neonates });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single neonate
router.get('/:id', async (req, res) => {
  try {
    const neonate = await Neonate.findById(req.params.id);
    res.json({ success: true, neonate });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// CREATE neonate
router.post('/', async (req, res) => {
  try {
    const neonate = new Neonate(req.body);
    await neonate.save();
    res.json({ success: true, neonate });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE neonate
router.put('/:id', async (req, res) => {
  try {
    const neonate = await Neonate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, neonate });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
