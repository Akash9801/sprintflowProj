const Task = require('../models/Task')
const Project = require('../models/Project')
const asyncHandler = require('../middleware/asyncHandler')
const { sendSuccess, sendCreated, sendError } = require('../utils/apiResponse')

// ─── Helper: verify the project exists and belongs to req.user ───────────────
const assertProjectOwnership = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, createdBy: userId })
  return project // null if not found or not owned
}

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all tasks for a project
// @route   GET /api/tasks/project/:projectId
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getTasksByProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params

  // Ensure project belongs to this user before returning its tasks
  const project = await assertProjectOwnership(projectId, req.user._id)
  if (!project) {
    return sendError(res, 'Project not found', 404)
  }

  // Optional query filters (forwarded from frontend TaskFilters)
  const filter = { projectId }
  if (req.query.status && req.query.status !== 'all') {
    filter.status = req.query.status
  }
  if (req.query.priority && req.query.priority !== 'all') {
    filter.priority = req.query.priority
  }

  const tasks = await Task.find(filter)
    .sort({ createdAt: -1 })
    .lean()

  return sendSuccess(res, tasks)
})

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all tasks for the current user (used on Dashboard)
// @route   GET /api/tasks
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user._id })
    .sort({ createdAt: -1 })
    .lean()

  return sendSuccess(res, tasks)
})

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Create a new task in a project
// @route   POST /api/tasks
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, deadline, assignee, projectId } = req.body

  if (!title) return sendError(res, 'Task title is required', 400)
  if (!projectId) return sendError(res, 'Project ID is required', 400)

  // Verify project ownership
  const project = await assertProjectOwnership(projectId, req.user._id)
  if (!project) {
    return sendError(res, 'Project not found or access denied', 404)
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    deadline: deadline || null,
    assignee,
    projectId,
    createdBy: req.user._id,
  })

  return sendCreated(res, task.toObject(), 'Task created')
})

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Update a task (status, priority, title, etc.)
// @route   PUT /api/tasks/:id
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  })

  if (!task) {
    return sendError(res, 'Task not found', 404)
  }

  // Update only provided fields
  const { title, description, status, priority, deadline, assignee } = req.body
  if (title !== undefined) task.title = title
  if (description !== undefined) task.description = description
  if (status !== undefined) task.status = status
  if (priority !== undefined) task.priority = priority
  if (deadline !== undefined) task.deadline = deadline || null
  if (assignee !== undefined) task.assignee = assignee

  const updated = await task.save()

  return sendSuccess(res, updated.toObject(), 'Task updated')
})

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  })

  if (!task) {
    return sendError(res, 'Task not found', 404)
  }

  await task.deleteOne()

  return sendSuccess(res, null, 'Task deleted')
})

module.exports = {
  getTasksByProject,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
}
