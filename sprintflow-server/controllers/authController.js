const User = require('../models/User')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('../middleware/asyncHandler')
const { sendSuccess, sendCreated, sendError } = require('../utils/apiResponse')

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Basic presence validation (Mongoose handles deeper validation)
  if (!name || !email || !password) {
    return sendError(res, 'Please provide name, email, and password', 400)
  }

  // Check for existing account before attempting insert (friendlier error)
  const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
  if (existingUser) {
    return sendError(res, 'An account with that email already exists', 409)
  }

  const user = await User.create({ name, email, password })
  const token = generateToken(user._id)

  return sendCreated(res, {
    user: user.toPublicJSON(),
    token,
  }, 'Account created successfully')
})

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Authenticate user and return JWT
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return sendError(res, 'Please provide email and password', 400)
  }

  // Explicitly select password (excluded by default via schema `select: false`)
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password')

  if (!user || !(await user.matchPassword(password))) {
    // Return the same generic message for both cases to avoid email enumeration
    return sendError(res, 'Invalid email or password', 401)
  }

  const token = generateToken(user._id)

  return sendSuccess(res, {
    user: user.toPublicJSON(),
    token,
  }, 'Login successful')
})

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get current authenticated user's profile
// @route   GET /api/auth/me
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getMe = asyncHandler(async (req, res) => {
  // req.user is attached by the protect middleware
  return sendSuccess(res, { user: req.user.toPublicJSON() })
})

module.exports = { registerUser, loginUser, getMe }
