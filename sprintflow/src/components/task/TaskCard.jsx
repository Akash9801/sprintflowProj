import { useState } from 'react'
import { formatDate, getPriorityClass, isOverdue } from '../../utils/helpers'
import { PRIORITY_LABELS, TASK_STATUS, STATUS_LABELS } from '../../utils/constants'

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const [showActions, setShowActions] = useState(false)
  const overdue = isOverdue(task.deadline) && task.status !== TASK_STATUS.DONE
  const isDone = task.status === TASK_STATUS.DONE

  const nextStatus = {
    [TASK_STATUS.TODO]:        TASK_STATUS.IN_PROGRESS,
    [TASK_STATUS.IN_PROGRESS]: TASK_STATUS.DONE,
  }

  return (
    <div
      className={`relative bg-white rounded-xl border shadow-card p-3.5 hover:shadow-card-hover transition-all duration-200 group
        ${overdue ? 'border-red-200' : 'border-surface-200'}`}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`badge ${getPriorityClass(task.priority)}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
        <button
          onClick={() => setShowActions((v) => !v)}
          className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-surface-400 hover:text-surface-600 transition-all"
          aria-label="Task options"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
          </svg>
        </button>
      </div>

      {/* Actions dropdown */}
      {showActions && (
        <div className="absolute top-8 right-0 w-44 bg-white rounded-xl border border-surface-200 shadow-modal py-1 z-20 animate-slide-up">
          {!isDone && (
            <button
              onClick={() => { onStatusChange(task._id, nextStatus[task.status]); setShowActions(false) }}
              className="w-full text-left px-3 py-2 text-xs text-surface-700 hover:bg-surface-50"
            >
              Move → {STATUS_LABELS[nextStatus[task.status]]}
            </button>
          )}
          <button
            onClick={() => { onDelete(task._id); setShowActions(false) }}
            className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50"
          >
            Delete task
          </button>
        </div>
      )}

      {/* Title */}
      <p className="text-sm font-medium text-surface-800 leading-snug mb-3">{task.title}</p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        {/* Assignee initial */}
        {task.assignee && (
          <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-brand-700">
              {task.assignee[0].toUpperCase()}
            </span>
          </div>
        )}

        {/* Deadline */}
        {task.deadline && (
          <div className={`flex items-center gap-1 text-xs ml-auto ${overdue ? 'text-red-500' : 'text-surface-400'}`}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(task.deadline)}</span>
          </div>
        )}
      </div>

      {/* Status change button — hidden for completed tasks */}
      {!isDone && (
        <button
          onClick={() => onStatusChange(task._id, nextStatus[task.status])}
          className="mt-2.5 w-full text-xs text-surface-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg py-1.5 transition-colors border border-dashed border-surface-200 hover:border-brand-300"
        >
          Move to {STATUS_LABELS[nextStatus[task.status]]} →
        </button>
      )}
    </div>
  )
}