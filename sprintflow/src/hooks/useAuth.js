import { useAuthContext } from '../context/AuthContext'

/**
 * Convenience hook for consuming AuthContext.
 * Prefer this over useAuthContext in component files.
 */
export function useAuth() {
  return useAuthContext()
}

export default useAuth
