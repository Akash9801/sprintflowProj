const jwt = require('jsonwebtoken')

/**
 * Generate a signed JWT for a given user ID.
 * The token is verified by authMiddleware on protected routes.
 *
 * @param {string} userId — MongoDB ObjectId string
 * @returns {string} signed JWT
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

module.exports = generateToken
