const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  wardName: { type: String, default: 'Neonatal Benefit Unit' },
  hospitalName: { type: String, default: 'NeoDesk General Hospital' },
  broadcastMessage: { type: String, default: 'All clinical protocols updated to v4.2 standards.' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', SettingsSchema);
