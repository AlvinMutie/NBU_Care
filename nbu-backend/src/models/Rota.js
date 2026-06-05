const mongoose = require('mongoose');

const RotaSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  shift: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Night'],
    required: true
  },
  nurses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  consultant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// Ensure unique rota for a date and shift
RotaSchema.index({ date: 1, shift: 1 }, { unique: true });

module.exports = mongoose.model('Rota', RotaSchema);
