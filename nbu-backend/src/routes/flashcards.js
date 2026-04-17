const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../services/upload');

// @desc    Get all flashcards
router.get('/', protect, async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json({ success: true, count: flashcards.length, data: flashcards });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Upload image
router.post('/upload', protect, authorize('Nursing In-Charge', 'Consultant Pediatrician'), upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Please upload a file' });
  res.json({ success: true, url: `/uploads/${req.file.filename}` });
});

// @desc    Create new flashcard
router.post('/', protect, authorize('Nursing In-Charge', 'Consultant Pediatrician', 'ICT / IT Support'), async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const flashcard = await Flashcard.create(req.body);
    res.status(201).json({ success: true, data: flashcard });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @desc    Update flashcard
router.put('/:id', protect, authorize('Nursing In-Charge', 'Consultant Pediatrician'), async (req, res) => {
  try {
    let flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) return res.status(404).json({ message: 'Not found' });
    
    req.body.updatedBy = req.user.id;
    flashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: flashcard });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @desc    Delete flashcard
router.delete('/:id', protect, authorize('Nursing In-Charge'), async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) return res.status(404).json({ message: 'Not found' });
    await flashcard.deleteOne();
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
