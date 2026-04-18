const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @desc    Update scenario completion
// @route   POST /api/learning/complete-scenario
router.post('/complete-scenario', protect, async (req, res) => {
  try {
    const { scenarioId } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user.learningStats.completedScenarios.includes(scenarioId)) {
      user.learningStats.completedScenarios.push(scenarioId);
      
      // Award badge if first scenario
      if (user.learningStats.completedScenarios.length === 1) {
        user.learningStats.badges.push('First Simulation');
      }
      
      await user.save();
    }
    
    res.json({ success: true, learningStats: user.learningStats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update flashcard completion
// @route   POST /api/learning/complete-flashcard
router.post('/complete-flashcard', protect, async (req, res) => {
  try {
    const { flashcardId } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user.learningStats.completedFlashcards.includes(flashcardId)) {
      user.learningStats.completedFlashcards.push(flashcardId);
      await user.save();
    }
    
    res.json({ success: true, learningStats: user.learningStats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Get learning stats
// @route   GET /api/learning/stats
router.get('/stats', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, learningStats: user.learningStats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update quiz score
// @route   POST /api/learning/quiz-score
router.post('/quiz-score', protect, async (req, res) => {
  try {
    const { score } = req.body;
    const user = await User.findById(req.user.id);
    
    user.learningStats.quizScore += score;
    
    // Award badge for high score
    if (user.learningStats.quizScore >= 100 && !user.learningStats.badges.includes('Guideline Pro')) {
      user.learningStats.badges.push('Guideline Pro');
    }
    
    await user.save();
    res.json({ success: true, learningStats: user.learningStats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
