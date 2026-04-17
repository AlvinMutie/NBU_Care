function notFound(req, res) {
  res.status(404).json({
    error: { code: 'NOT_FOUND', message: 'Route not found' },
  });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = status === 500 ? 'Unexpected server error' : err.message;

  if (process.env.NODE_ENV !== 'test') {
    // Intentionally minimal; do not leak secrets
    console.error(err);
  }

  res.status(status).json({
    error: {
      code,
      message,
      details: err.details || undefined,
    },
  });
}

module.exports = { notFound, errorHandler };

