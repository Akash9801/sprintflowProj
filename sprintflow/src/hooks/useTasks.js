import { useState, useEffect, useCallback } from 'react'
import { taskService } from '../services/taskService'

/**
 * Reusable hook for task data management within a project.
 * Provides optimistic updates for status changes and deletes.
 */
export function useTasks(projectId) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    if (!projectId) return
    setLoading(true)
    setError(null)
    try {
      const data = await taskService.getTasksByProject(projectId)
      setTasks(data)
    } catch (err) {
      setError(err.message || 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }, [projectId])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  const createTask = useCallback(async (formData) => {
    const newTask = await taskService.createTask({ ...formData, projectId })
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }, [projectId])

  /**
   * Optimistic status update — UI updates immediately, rolls back on failure.
   */
  const updateTaskStatus = useCallback(async (taskId, newStatus) => {
    const prev = tasks.find((t) => t._id === taskId)
    // Optimistic
    setTasks((all) => all.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t)))
    try {
      await taskService.updateTask(taskId, { status: newStatus })
    } catch (err) {
      // Rollback
      setTasks((all) => all.map((t) => (t._id === taskId ? prev : t)))
      throw err
    }
  }, [tasks])

  const updateTask = useCallback(async (taskId, data) => {
    const updated = await taskService.updateTask(taskId, data)
    setTasks((all) => all.map((t) => (t._id === taskId ? updated : t)))
    return updated
  }, [])

  /**
   * Optimistic delete.
   */
  const deleteTask = useCallback(async (taskId) => {
    const snapshot = tasks
    setTasks((all) => all.filter((t) => t._id !== taskId))
    try {
      await taskService.deleteTask(taskId)
    } catch (err) {
      setTasks(snapshot)
      throw err
    }
  }, [tasks])

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks,
    createTask,
    updateTaskStatus,
    updateTask,
    deleteTask,
  }
}
