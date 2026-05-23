/**
 * Standardised API response helpers.
 * All endpoints use these so the frontend always gets a predictable shape.
 *
 * Success:  { success: true,  message: string, data: any }
 * Error:    { success: false, message: string }
 */

const sendSuccess = (res, data = null, message = 'OK', statusCode = 200) => {
  const body = { success: true, message }
  if (data !== null) body.data = data
  return res.status(statusCode).json(body)
}

const sendCreated = (res, data, message = 'Created successfully') =>
  sendSuccess(res, data, message, 201)

const sendError = (res, message = 'Something went wrong', statusCode = 500) =>
  res.status(statusCode).json({ success: false, message })

module.exports = { sendSuccess, sendCreated, sendError }
