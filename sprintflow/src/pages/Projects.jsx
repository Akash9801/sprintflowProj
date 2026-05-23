import { useState } from 'react'
import { useProjects } from '../hooks/useProjects'
import { useToast } from '../context/ToastContext'
import ProjectList from '../components/project/ProjectList'
import ProjectForm from '../components/project/ProjectForm'
import Modal from '../components/common/Modal'
import Loader from '../components/common/Loader'

export default function Projects() {
  const { projects, loading, createProject, deleteProject } = useProjects()
  const { success, error: toastError } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  const handleCreateProject = async (formData) => {
    setCreating(true)
    try {
      await createProject(formData)
      setModalOpen(false)
      success(`Project "${formData.title}" created`)
    } catch {
      toastError('Failed to create project. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteProject = async (id) => {
    const project = projects.find((p) => p._id === id)
    try {
      await deleteProject(id)
      success(`"${project?.title}" deleted`)
    } catch {
      toastError('Failed to delete project')
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-surface-500">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </p>
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader size="lg" text="Loading projects…" />
        </div>
      ) : (
        <ProjectList
          projects={projects}
          onCreateClick={() => setModalOpen(true)}
          onDelete={handleDeleteProject}
        />
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create new project">
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setModalOpen(false)}
          loading={creating}
        />
      </Modal>
    </div>
  )
}
