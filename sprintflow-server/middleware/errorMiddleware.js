/**
 * Centralised Express error-handling middleware.
 * Must be registered AFTER all routes in server.js.
 *
 * Handles:
 * - Mongoose CastError (invalid ObjectId)
 * - Mongoose duplicate key (E11000)
 * - Mongoose validation errors
 * - JWT errors (caught upstream in authMiddleware, but kept as fallback)
 * - Generic errors
 */
const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message || 'Internal Server Error'

  // ── Mongoose: invalid ObjectId (e.g. /api/projects/not-a-valid-id) ──────────
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404
    message = `Resource not found — invalid ID format`
  }

  // ── Mongoose: duplicate unique field (email already in use) ──────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    statusCode = 409
    message = `An account with that ${field} already exists`
  }

  // ── Mongoose: schema validation errors ───────────────────────────────────────
  if (err.name === 'ValidationError') {
    statusCode = 422
    // Collect all field-level messages into a single readable string
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join('. ')
  }

  // ── JWT ──────────────────────────────────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token'
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired — please log in again'
  }

  // Log stack in development only
  if (process.env.NODE_ENV === 'development') {
    console.error(`[ERROR] ${err.stack}`)
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Include stack trace in dev for faster debugging
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

/**
 * 404 handler — catches requests that didn't match any route.
 * Register this BEFORE errorMiddleware in server.js.
 */
const notFoundMiddleware = (req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`)
  err.statusCode = 404
  next(err)
}

module.exports = { errorMiddleware, notFoundMiddleware }
