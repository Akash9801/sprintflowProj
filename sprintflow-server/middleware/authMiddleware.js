const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const User = require('../models/User')
const { sendError } = require('../utils/apiResponse')

/**
 * protect — verifies the Bearer JWT and attaches req.user.
 * Use on any route that requires authentication.
 */
const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Not authorised — no token provided', 401)
  }

  const token = authHeader.split(' ')[1]

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    const message =
      err.name === 'TokenExpiredError'
        ? 'Session expired — please log in again'
        : 'Not authorised — invalid token'
    return sendError(res, message, 401)
  }

  // Attach user to request (password excluded via `select: false` on schema)
  const user = await User.findById(decoded.id)
  if (!user) {
    return sendError(res, 'Not authorised — user no longer exists', 401)
  }

  req.user = user
  next()
})

module.exports = { protect }
