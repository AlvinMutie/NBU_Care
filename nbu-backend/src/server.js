const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/flashcards', require('./routes/flashcards'));
app.use('/api/scenarios', require('./routes/scenarios'));
app.use('/api/audit', require('./routes/audit'));
app.use('/api/rota', require('./routes/rota'));
app.use('/api/neonates', require('./routes/neonates'));
app.use('/api/handovers', require('./routes/handovers'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/learning', require('./routes/learning'));

// Basic Route
app.get('/api/health', (req, res) => res.json({ status: 'NeoDesk Assistant Backend Online' }));

const User = require('./models/User');

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nbu_nurse_assistant';

// Connect to MongoDB and Start Server
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Auto-seed default users for first-time setup
    try {
      const adminExists = await User.findOne({ email: 'incharge@nbu.hospital.ke' });
      if (!adminExists) {
        console.log('Seeding default admin user...');
        await User.create({
          name: 'Nursing In-Charge',
          email: 'incharge@nbu.hospital.ke',
          password: 'Admin@1234',
          role: 'Nursing In-Charge',
          status: 'Approved',
          isVerified: true,
          phone: '0711000000',
          idNumber: 'ADMIN-001',
          profileImage: '/uploads/profiles/default.png'
        });
      }
    } catch (e) {
      console.error('Seeding error:', e);
    }

    if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = app;
