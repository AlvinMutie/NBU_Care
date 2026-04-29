const mongoose = require('mongoose');

const HandoverSchema = new mongoose.Schema({
  neonate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Neonate',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  shift: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Night'],
    required: true
  },
  clinicalLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  nurseOnDuty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  commentary: String,
  vitals: {
    temperature: Number,
    sugarLevel: Number,
    oxygenSaturation: Number,
    heartRate: Number,
    respiratoryRate: Number
  },
  investigations: {
    liver: String,
    kidney: String,
    fbc: String,
    other: String
  },
  medicationsGiven: [{
    drug: String,
    dose: String,
    time: Date
  }],
  plan: String
}, { timestamps: true });

module.exports = mongoose.model('Handover', HandoverSchema);
