const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flashcard = require('../models/Flashcard');
const Scenario = require('../models/Scenario');
const Settings = require('../models/Settings');
const { protect, authorize } = require('../middleware/auth');

// @desc    Get system settings
// @route   GET /api/admin/settings
// @access  Private
router.get('/settings', protect, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update system settings
// @route   PATCH /api/admin/settings
// @access  Private/Admin
router.patch('/settings', protect, authorize('Nursing In-Charge', 'Consultant Pediatrician'), async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Get system admin stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, authorize('Nursing In-Charge', 'Consultant Pediatrician'), async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const flashcardCount = await Flashcard.countDocuments();
    const scenarioCount = await Scenario.countDocuments();

    res.json({
      success: true,
      data: {
        users: userCount,
        flashcards: flashcardCount,
        scenarios: scenarioCount
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Create new user by admin
// @route   POST /api/admin/users
// @access  Private/Admin
router.post('/users', protect, authorize('Nursing In-Charge', 'Consultant Pediatrician'), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }
    
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ success: true, data: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @desc    Get all users for management
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, authorize('Nursing In-Charge', 'Consultant Pediatrician', 'ICT / IT Support'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update user status (Active/Restricted)
// @route   PATCH /api/admin/users/:id/status
// @access  Private/Admin
router.patch('/users/:id/status', protect, authorize('Nursing In-Charge', 'Consultant Pediatrician', 'ICT / IT Support'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Active', 'Restricted'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    user.status = status;
    await user.save();
    
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Delete user record
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, authorize('Nursing In-Charge', 'Consultant Pediatrician'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    await user.deleteOne();
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
