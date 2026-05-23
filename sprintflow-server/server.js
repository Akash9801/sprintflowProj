// ─── Load environment variables first ────────────────────────────────────────
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes')
const taskRoutes = require('./routes/taskRoutes')
const { errorMiddleware, notFoundMiddleware } = require('./middleware/errorMiddleware')

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB()

const app = express()

// ─── Security headers ─────────────────────────────────────────────────────────
app.use(helmet())

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:5173', // Vite default dev port
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS: origin "${origin}" not allowed`))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// ─── Request logging (dev only) ───────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// ─── Body parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))       // JSON payloads
app.use(express.urlencoded({ extended: false })) // URL-encoded forms

// ─── Rate limiting ────────────────────────────────────────────────────────────
// Auth routes: stricter limit to prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { success: false, message: 'Too many requests — please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

// General API limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests — please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/projects', apiLimiter, projectRoutes)
app.use('/api/tasks', apiLimiter, taskRoutes)

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'SprintFlow API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// ─── 404 + Error handlers (must be last) ─────────────────────────────────────
app.use(notFoundMiddleware)
app.use(errorMiddleware)

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`🚀  SprintFlow API running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
})

// ─── Graceful shutdown on unhandled errors ────────────────────────────────────
process.on('unhandledRejection', (err) => {
  console.error(`❌  Unhandled Promise Rejection: ${err.message}`)
  server.close(() => process.exit(1))
})

process.on('uncaughtException', (err) => {
  console.error(`❌  Uncaught Exception: ${err.message}`)
  process.exit(1)
})
