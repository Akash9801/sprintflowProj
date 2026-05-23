const mongoose = require('mongoose')

// Match frontend constants exactly (src/utils/constants.js)
const TASK_STATUS   = ['todo', 'in-progress', 'done']
const TASK_PRIORITY = ['low', 'medium', 'high', 'urgent']

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: TASK_STATUS,
        message: `Status must be one of: ${TASK_STATUS.join(', ')}`,
      },
      default: 'todo',
    },
    priority: {
      type: String,
      enum: {
        values: TASK_PRIORITY,
        message: `Priority must be one of: ${TASK_PRIORITY.join(', ')}`,
      },
      default: 'medium',
    },
    deadline: {
      type: Date,
      default: null,
    },
    assignee: {
      type: String,
      trim: true,
      default: '',
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project ID is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// ─── Indexes for common query patterns ────────────────────────────────────────
taskSchema.index({ projectId: 1, status: 1 })
taskSchema.index({ projectId: 1, createdAt: -1 })
taskSchema.index({ createdBy: 1 })

const Task = mongoose.model('Task', taskSchema)
module.exports = Task
