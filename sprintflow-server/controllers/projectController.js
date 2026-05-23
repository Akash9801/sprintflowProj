const Project = require('../models/Project')
const Task = require('../models/Task')
const asyncHandler = require('../middleware/asyncHandler')
const { sendSuccess, sendCreated, sendError } = require('../utils/apiResponse')

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all projects for the authenticated user
// @route   GET /api/projects
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ createdBy: req.user._id })
    .sort({ createdAt: -1 })
    .lean() // plain JS objects — faster for read-only payloads

  // Attach taskCount to each project without N+1 queries
  const projectIds = projects.map((p) => p._id)

  const taskCounts = await Task.aggregate([
    { $match: { projectId: { $in: projectIds } } },
    { $group: { _id: '$projectId', count: { $sum: 1 } } },
  ])

  // Build a lookup map: { projectId: count }
  const countMap = taskCounts.reduce((acc, { _id, count }) => {
    acc[_id.toString()] = count
    return acc
  }, {})

  const enriched = projects.map((p) => ({
    ...p,
    taskCount: countMap[p._id.toString()] || 0,
  }))

  return sendSuccess(res, enriched)
})

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  }).lean()

  if (!project) {
    return sendError(res, 'Project not found', 404)
  }

  const taskCount = await Task.countDocuments({ projectId: project._id })

  return sendSuccess(res, { ...project, taskCount })
})

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const createProject = asyncHandler(async (req, res) => {
  const { title, description, color, status } = req.body

  if (!title) {
    return sendError(res, 'Project title is required', 400)
  }

  const project = await Project.create({
    title,
    description,
    color,
    status,
    createdBy: req.user._id,
  })

  return sendCreated(res, { ...project.toObject(), taskCount: 0 }, 'Project created')
})

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  })

  if (!project) {
    return sendError(res, 'Project not found', 404)
  }

  // Only update allowed fields
  const { title, description, color, status } = req.body
  if (title !== undefined) project.title = title
  if (description !== undefined) project.description = description
  if (color !== undefined) project.color = color
  if (status !== undefined) project.status = status

  const updated = await project.save()

  return sendSuccess(res, updated.toObject(), 'Project updated')
})

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Delete a project and all its tasks
// @route   DELETE /api/projects/:id
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  })

  if (!project) {
    return sendError(res, 'Project not found', 404)
  }

  // Cascade-delete all tasks in the project
  await Task.deleteMany({ projectId: project._id })
  await project.deleteOne()

  return sendSuccess(res, null, 'Project and all its tasks deleted')
})

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
}
