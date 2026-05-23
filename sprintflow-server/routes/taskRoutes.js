const express = require('express')
const router = express.Router()
const {
  getTasksByProject,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')
const { protect } = require('../middleware/authMiddleware')

// All task routes require authentication
router.use(protect)

// GET  /api/tasks                       — all tasks for current user (dashboard)
// POST /api/tasks                       — create a new task
router.route('/').get(getAllTasks).post(createTask)

// GET  /api/tasks/project/:projectId    — tasks filtered by project
router.get('/project/:projectId', getTasksByProject)

// PUT    /api/tasks/:id                 — update task
// DELETE /api/tasks/:id                 — delete task
router.route('/:id').put(updateTask).delete(deleteTask)

module.exports = router
