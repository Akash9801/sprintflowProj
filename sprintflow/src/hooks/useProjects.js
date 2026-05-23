import { useState, useEffect, useCallback } from 'react'
import { projectService } from '../services/projectService'

/**
 * Reusable hook for project data management.
 * Encapsulates fetch, create, and delete so pages stay lean.
 */
export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await projectService.getProjects()
      setProjects(data)
    } catch (err) {
      setError(err.message || 'Failed to load projects')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  const createProject = useCallback(async (formData) => {
    const newProject = await projectService.createProject(formData)
    setProjects((prev) => [newProject, ...prev])
    return newProject
  }, [])

  const deleteProject = useCallback(async (id) => {
    await projectService.deleteProject(id)
    setProjects((prev) => prev.filter((p) => p._id !== id))
  }, [])

  const updateProject = useCallback(async (id, data) => {
    const updated = await projectService.updateProject(id, data)
    setProjects((prev) => prev.map((p) => (p._id === id ? updated : p)))
    return updated
  }, [])

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    deleteProject,
    updateProject,
  }
}
