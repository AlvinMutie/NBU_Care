const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: [
      'Nursing In-Charge',
      'Nurse',
      'Consultant Pediatrician',
      'CO Pediatrics / MO',
      'Student',
      'ICT / IT Support',
      'Hospital Management'
    ],
    default: 'Student'
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }],
  status: { 
    type: String, 
    enum: ['Active', 'Restricted'], 
    default: 'Active' 
  },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
