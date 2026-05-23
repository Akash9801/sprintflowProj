import api from './api'

/**
 * Auth Service — real backend API integration.
 */

export const authService = {
  async login(credentials) {
    const res = await api.post('/api/auth/login', credentials)
    return res.data.data // { user, token }
  },

  async register(data) {
    const res = await api.post('/api/auth/register', data)
    return res.data.data // { user, token }
  },

  async getMe() {
    const res = await api.get('/api/auth/me')
    return res.data.data.user
  },

  async logout() {
    return true
  },
}
