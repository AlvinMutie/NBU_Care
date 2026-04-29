const mongoose = require('mongoose');

const NeonateSchema = new mongoose.Schema({
  hospitalNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  birthWeight: {
    type: Number, // in kg
    required: true
  },
  currentWeight: {
    type: Number, // in kg
    required: true
  },
  gestationalAge: {
    type: Number, // in weeks
    required: true
  },
  admissionDiagnosis: String,
  history: String,
  status: {
    type: String,
    enum: ['Stable', 'Critical', 'Serious', 'Discharged'],
    default: 'Stable'
  },
  motherName: String,
  motherPhone: String,
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Neonate', NeonateSchema);
