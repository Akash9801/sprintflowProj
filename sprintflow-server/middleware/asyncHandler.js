/**
 * Wraps an async Express route handler and forwards any thrown errors
 * to the next() error middleware — removing the need for try/catch in
 * every controller function.
 *
 * Usage:
 *   router.get('/route', asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = asyncHandler
