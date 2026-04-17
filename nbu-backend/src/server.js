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

// Basic Route
app.get('/api/health', (req, res) => res.json({ status: 'NeoDesk Assistant Backend Online' }));

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nbu_nurse_assistant';

if (process.env.NODE_ENV !== 'production') {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
      console.error('Database connection error:', err);
    });
} else {
  mongoose.connect(MONGODB_URI);
}

module.exports = app;
