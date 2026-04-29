const express = require('express');
const router = express.Router();
const Rota = require('../models/Rota');
const User = require('../models/User');

// Middleware to verify authentication (Simplified for now)
const auth = (req, res, next) => {
  // In a real app, verify JWT here. 
  // For this implementation, we assume authentication is handled upstream.
  next();
};

// GET all rotas for a month
router.get('/', async (req, res) => {
  try {
    const { month, year } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const rotas = await Rota.find({
      date: { $gte: startDate, $lte: endDate }
    }).populate('nurses', 'name phone profileImage isVerified')
      .populate('consultant', 'name phone profileImage')
      .populate('manager', 'name phone profileImage');

    res.json({ success: true, rotas });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET current shift rota
router.get('/current', async (req, res) => {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    // Determine shift based on current hour
    const hour = new Date().getHours();
    let shift = 'Morning';
    if (hour >= 13 && hour < 19) shift = 'Afternoon';
    if (hour >= 19 || hour < 7) shift = 'Night';

    const rota = await Rota.findOne({ date: now, shift })
      .populate('nurses', 'name phone profileImage')
      .populate('consultant', 'name phone profileImage')
      .populate('manager', 'name phone profileImage');

    res.json({ success: true, rota });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// CREATE or UPDATE rota
router.post('/', async (req, res) => {
  try {
    const { date, shift, nurses, consultant, manager, createdBy } = req.body;
    
    const rotaDate = new Date(date);
    rotaDate.setHours(0, 0, 0, 0);

    const rota = await Rota.findOneAndUpdate(
      { date: rotaDate, shift },
      { nurses, consultant, manager, createdBy },
      { upsert: true, new: true }
    );

    res.json({ success: true, rota });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
