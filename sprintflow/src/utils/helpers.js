import { TASK_PRIORITY, TASK_STATUS } from './constants'

/**
 * Format a date string to a human-readable format.
 */
export function formatDate(dateString) {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/**
 * Format date to relative time (e.g. "2 days ago").
 */
export function timeAgo(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  return formatDate(dateString)
}

/**
 * Check if a deadline is overdue.
 */
export function isOverdue(deadlineString) {
  if (!deadlineString) return false
  return new Date(deadlineString) < new Date()
}

/**
 * Returns priority badge class.
 */
export function getPriorityClass(priority) {
  const map = {
    [TASK_PRIORITY.LOW]: 'priority-low',
    [TASK_PRIORITY.MEDIUM]: 'priority-medium',
    [TASK_PRIORITY.HIGH]: 'priority-high',
    [TASK_PRIORITY.URGENT]: 'priority-urgent',
  }
  return map[priority] || 'priority-medium'
}

/**
 * Returns status badge class.
 */
export function getStatusClass(status) {
  const map = {
    [TASK_STATUS.TODO]: 'status-todo',
    [TASK_STATUS.IN_PROGRESS]: 'status-in-progress',
    [TASK_STATUS.DONE]: 'status-done',
  }
  return map[status] || 'status-todo'
}

/**
 * Generate initials from a name.
 */
export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

/**
 * Truncate long strings.
 */
export function truncate(str, max = 60) {
  if (!str) return ''
  return str.length > max ? str.slice(0, max) + '…' : str
}

/**
 * Group an array of tasks by their status field.
 */
export function groupTasksByStatus(tasks) {
  return tasks.reduce((acc, task) => {
    const key = task.status || TASK_STATUS.TODO
    if (!acc[key]) acc[key] = []
    acc[key].push(task)
    return acc
  }, {})
}

/**
 * Filter tasks by status and/or priority.
 */
export function filterTasks(tasks, { status, priority }) {
  return tasks.filter((task) => {
    const matchStatus = !status || status === 'all' || task.status === status
    const matchPriority = !priority || priority === 'all' || task.priority === priority
    return matchStatus && matchPriority
  })
}
