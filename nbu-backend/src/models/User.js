const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  idNumber: { type: String, required: true },
  profileImage: { type: String, required: true }, // Path to uploaded image
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
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected', 'Restricted'], 
    default: 'Pending' 
  },
  isVerified: { type: Boolean, default: false },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verificationDate: { type: Date },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }],
  learningStats: {
    completedScenarios: [{ type: String }],
    completedFlashcards: [{ type: String }],
    quizScore: { type: Number, default: 0 },
    badges: [{ type: String }],
    lastDailyQuiz: { type: Date }
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
