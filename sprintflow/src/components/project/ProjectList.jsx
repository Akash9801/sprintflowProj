import ProjectCard from './ProjectCard'
import EmptyState from '../common/EmptyState'

export default function ProjectList({ projects = [], onCreateClick, onDelete }) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        }
        title="No projects yet"
        description="Create your first project to start organizing tasks across your team."
        action={
          <button onClick={onCreateClick} className="btn-primary">
            Create Project
          </button>
        }
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} onDelete={onDelete} />
      ))}
    </div>
  )
}
