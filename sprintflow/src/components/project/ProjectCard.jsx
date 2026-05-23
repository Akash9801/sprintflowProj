import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helpers'
import ConfirmDialog from '../common/ConfirmDialog'

export default function ProjectCard({ project, onDelete }) {
  const { _id, title, description, taskCount, color, createdAt } = project
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async (e) => {
    e.preventDefault()
    setDeleting(true)
    try {
      await onDelete?.(_id)
    } finally {
      setDeleting(false)
      setConfirmOpen(false)
    }
  }

  return (
    <>
      <div className="card p-5 hover:shadow-card-hover transition-all duration-200 group relative">
        {/* Delete button — appears on hover */}
        {onDelete && (
          <button
            onClick={(e) => { e.preventDefault(); setConfirmOpen(true) }}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-surface-300 hover:text-red-500 hover:bg-red-50
                       opacity-0 group-hover:opacity-100 transition-all duration-150"
            title="Delete project"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}

        <Link to={`/project/${_id}`} className="block">
          {/* Color indicator */}
          <div
            className="w-8 h-8 rounded-xl mb-3.5 flex items-center justify-center"
            style={{ backgroundColor: color + '20' }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-surface-900 group-hover:text-brand-700 transition-colors truncate mb-1 pr-6">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs text-surface-500 line-clamp-2 mb-4 leading-relaxed">
            {description || 'No description provided.'}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-surface-100">
            <div className="flex items-center gap-1.5 text-xs text-surface-500">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="font-medium">{taskCount ?? 0} tasks</span>
            </div>
            <span className="text-xs text-surface-400">{formatDate(createdAt)}</span>
          </div>
        </Link>
      </div>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete project?"
        message={`"${title}" and all its tasks will be permanently deleted. This cannot be undone.`}
        confirmLabel="Delete project"
        danger
        loading={deleting}
      />
    </>
  )
}
