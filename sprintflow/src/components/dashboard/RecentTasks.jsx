import { Link } from 'react-router-dom'
import { formatDate, getPriorityClass, getStatusClass } from '../../utils/helpers'
import { PRIORITY_LABELS, STATUS_LABELS } from '../../utils/constants'
import EmptyState from '../common/EmptyState'

export default function RecentTasks({ tasks = [] }) {
  const recent = tasks.slice(0, 6)

  return (
    <div className="card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-surface-100">
        <h2 className="text-sm font-semibold text-surface-900">Recent Tasks</h2>
        <Link to="/projects" className="text-xs text-brand-600 hover:text-brand-700 font-medium">
          View all →
        </Link>
      </div>

      {recent.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description="Create a project and add some tasks to get started."
        />
      ) : (
        <div className="divide-y divide-surface-50">
          {recent.map((task) => (
            <div key={task._id} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-50 transition-colors">
              {/* Priority dot */}
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                task.priority === 'urgent' ? 'bg-purple-500' :
                task.priority === 'high' ? 'bg-red-500' :
                task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
              }`} />

              {/* Title */}
              <p className="flex-1 text-sm text-surface-800 truncate">{task.title}</p>

              {/* Badges */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`badge ${getPriorityClass(task.priority)}`}>
                  {PRIORITY_LABELS[task.priority]}
                </span>
                <span className={`badge ${getStatusClass(task.status)}`}>
                  {STATUS_LABELS[task.status]}
                </span>
                {task.deadline && (
                  <span className="text-xs text-surface-400 hidden sm:block">
                    {formatDate(task.deadline)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
