import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'
import { useToast } from '../context/ToastContext'
import { projectService } from '../services/projectService'
import KanbanBoard from '../components/task/KanbanBoard'
import TaskFilters from '../components/task/TaskFilters'
import TaskForm from '../components/task/TaskForm'
import Modal from '../components/common/Modal'
import Loader from '../components/common/Loader'
import { filterTasks } from '../utils/helpers'
import { TASK_STATUS } from '../utils/constants'

export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { success, error: toastError } = useToast()

  const [project, setProject] = useState(null)
  const [projectLoading, setProjectLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [defaultStatus, setDefaultStatus] = useState(TASK_STATUS.TODO)
  const [filters, setFilters] = useState({ status: 'all', priority: 'all' })
  const [creating, setCreating] = useState(false)

  const {
    tasks,
    loading: tasksLoading,
    updateTaskStatus,
    deleteTask,
    createTask,
  } = useTasks(id)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectById(id)
        setProject(data)
      } catch {
        navigate('/projects')
      } finally {
        setProjectLoading(false)
      }
    }
    fetchProject()
  }, [id])

  const handleAddTask = (status) => {
    setDefaultStatus(status)
    setModalOpen(true)
  }

  const handleCreateTask = async (formData) => {
    setCreating(true)
    try {
      await createTask({ ...formData, status: defaultStatus })
      setModalOpen(false)
      success('Task created')
    } catch {
      toastError('Failed to create task')
    } finally {
      setCreating(false)
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus)
    } catch {
      toastError('Failed to update task status')
    }
  }

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId)
      success('Task deleted')
    } catch {
      toastError('Failed to delete task')
    }
  }

  const filteredTasks = filterTasks(tasks, filters)

  if (projectLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader size="lg" text="Loading project…" />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/projects" className="text-surface-400 hover:text-surface-600 transition-colors">
          Projects
        </Link>
        <span className="text-surface-300">/</span>
        <span className="text-surface-700 font-medium">{project?.title}</span>
      </div>

      {/* Project header */}
      <div className="card p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: (project?.color || '#6366f1') + '20' }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: project?.color || '#6366f1' }}
              />
            </div>
            <div>
              <h2 className="text-base font-semibold text-surface-900">{project?.title}</h2>
              {project?.description && (
                <p className="text-sm text-surface-500 mt-0.5">{project.description}</p>
              )}
            </div>
          </div>

          <button onClick={() => handleAddTask(TASK_STATUS.TODO)} className="btn-primary flex-shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>

        {/* Quick stats row */}
        <div className="flex gap-6 mt-4 pt-4 border-t border-surface-100">
          {[
            { label: 'Total',       value: tasks.length },
            { label: 'To Do',       value: tasks.filter((t) => t.status === TASK_STATUS.TODO).length },
            { label: 'In Progress', value: tasks.filter((t) => t.status === 'in-progress').length },
            { label: 'Done',        value: tasks.filter((t) => t.status === TASK_STATUS.DONE).length },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-lg font-bold font-mono text-surface-900">{value}</p>
              <p className="text-xs text-surface-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <TaskFilters filters={filters} onChange={setFilters} taskCount={filteredTasks.length} />

      {/* Board */}
      <KanbanBoard
        tasks={filteredTasks}
        loading={tasksLoading}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onAddTask={handleAddTask}
      />

      {/* New task modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create new task">
        <TaskForm
          projectId={id}
          defaultStatus={defaultStatus}
          onSubmit={handleCreateTask}
          onCancel={() => setModalOpen(false)}
          loading={creating}
        />
      </Modal>
    </div>
  )
}
