import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'
import { LOCAL_STORAGE_KEYS } from '../utils/constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Verify session against backend on mount
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
      if (storedToken) {
        try {
          const userData = await authService.getMe()
          setToken(storedToken)
          setUser(userData)
          localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData))
        } catch {
          clearSession()
        }
      }
      setLoading(false)
    }
    restoreSession()
  }, [])

  const persistSession = (userData, tokenValue) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, tokenValue)
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData))
    setToken(tokenValue)
    setUser(userData)
  }

  const clearSession = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER)
    setToken(null)
    setUser(null)
  }

  const login = useCallback(async (credentials) => {
    setError(null)
    try {
      const { user: userData, token: tokenValue } = await authService.login(credentials)
      persistSession(userData, tokenValue)
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed'
      setError(msg)
      return { success: false, error: msg }
    }
  }, [])

  const register = useCallback(async (data) => {
    setError(null)
    try {
      const { user: userData, token: tokenValue } = await authService.register(data)
      persistSession(userData, tokenValue)
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed'
      setError(msg)
      return { success: false, error: msg }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      clearSession()
    }
  }, [])

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    setError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}

export default AuthContext
