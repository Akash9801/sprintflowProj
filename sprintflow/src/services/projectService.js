import api from './api'

/**
 * Project Service — all project-related API calls.
 */

export const projectService = {
  async getProjects() {
    const res = await api.get('/api/projects')
    return res.data.data
  },

  async getProjectById(id) {
    const res = await api.get(`/api/projects/${id}`)
    return res.data.data
  },

  async createProject(data) {
    const res = await api.post('/api/projects', data)
    return res.data.data
  },

  async updateProject(id, data) {
    const res = await api.put(`/api/projects/${id}`, data)
    return res.data.data
  },

  async deleteProject(id) {
    await api.delete(`/api/projects/${id}`)
    return true
  },
}
