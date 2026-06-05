const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  type: { type: String, required: true }, // e.g. 'Fluids', 'Meds', 'Urgent'
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Checked', 'Review', 'Waiting'], default: 'Waiting' },
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
