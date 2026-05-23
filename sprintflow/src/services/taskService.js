import api from './api'

/**
 * Task Service — all task-related API calls.
 */

export const taskService = {
  async getTasksByProject(projectId) {
    const res = await api.get(`/api/tasks/project/${projectId}`)
    return res.data.data
  },

  async getAllTasks() {
    const res = await api.get('/api/tasks')
    return res.data.data
  },

  async createTask(data) {
    const res = await api.post('/api/tasks', data)
    return res.data.data
  },

  async updateTask(id, data) {
    const res = await api.put(`/api/tasks/${id}`, data)
    return res.data.data
  },

  async deleteTask(id) {
    await api.delete(`/api/tasks/${id}`)
    return true
  },
}
