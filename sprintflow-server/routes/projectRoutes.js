const express = require('express')
const router = express.Router()
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController')
const { protect } = require('../middleware/authMiddleware')

// All project routes require authentication
router.use(protect)

// GET  /api/projects        — list all projects for current user
// POST /api/projects        — create new project
router.route('/').get(getProjects).post(createProject)

// GET    /api/projects/:id  — get single project
// PUT    /api/projects/:id  — update project
// DELETE /api/projects/:id  — delete project + cascade tasks
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject)

module.exports = router
