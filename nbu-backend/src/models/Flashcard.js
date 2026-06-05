const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Routine', 'Clinical', 'Critical', 'Calculations'] 
  },
  imageUrl: { type: String },
  whenToPerform: { type: String, required: true },
  steps: [{ type: String }],
  warning: { type: String },
  tips: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

FlashcardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);
