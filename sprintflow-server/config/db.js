const mongoose = require('mongoose')

/**
 * Connect to MongoDB Atlas.
 * Exits the process on failure so the server never starts in a broken state.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options silence Mongoose deprecation warnings
      serverSelectionTimeoutMS: 5000, // fail fast in dev if Atlas unreachable
    })

    console.log(`✅  MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`❌  MongoDB connection failed: ${err.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
