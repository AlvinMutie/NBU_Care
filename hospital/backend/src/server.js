require('dotenv').config();

const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Server } = require('socket.io');

const { notFound, errorHandler } = require('./middleware/errors');
const { bootstrapAdmin } = require('./services/bootstrapAdmin');
const { query } = require('./db/pool');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const flashcardsRoutes = require('./routes/flashcards');
const favoritesRoutes = require('./routes/favorites');
const scenariosRoutes = require('./routes/scenarios');
const publicRoutes = require('./routes/public');

async function main() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN ? process.env.FRONTEND_ORIGIN.split(',') : true,
      credentials: false,
    },
  });
  app.set('io', io);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(
    cors({
      origin: process.env.FRONTEND_ORIGIN ? process.env.FRONTEND_ORIGIN.split(',') : true,
      credentials: false,
    }),
  );
  app.use(express.json({ limit: '1mb' }));

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 300,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  const uploadDir = process.env.UPLOAD_DIR || 'uploads';
  app.use('/uploads', express.static(path.resolve(process.cwd(), uploadDir)));

  app.get('/api/health', async (req, res, next) => {
    try {
      await query('SELECT 1 as ok');
      res.json({ ok: true });
    } catch (err) {
      next(err);
    }
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/users', usersRoutes);
  app.use('/api/flashcards', flashcardsRoutes);
  app.use('/api/favorites', favoritesRoutes);
  app.use('/api/scenarios', scenariosRoutes);
  app.use('/api/public', publicRoutes);

  app.use(notFound);
  app.use(errorHandler);

  await bootstrapAdmin();

  const port = Number(process.env.PORT || 4000);
  server.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

