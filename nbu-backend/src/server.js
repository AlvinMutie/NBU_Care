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
app.use('/api/flashcards', require('./routes/flashcards'));
app.use('/api/scenarios', require('./routes/scenarios'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/learning', require('./routes/learning'));

// Basic Route
app.get('/api/health', (req, res) => res.json({ status: 'NeoDesk Assistant Backend Online' }));

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nbu_nurse_assistant';

// Connect to MongoDB and Start Server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Listen for requests if not running in a serverless environment that handles listening
    if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = app;
