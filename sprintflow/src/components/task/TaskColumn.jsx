import TaskCard from './TaskCard'
import { STATUS_LABELS } from '../../utils/constants'

const COLUMN_STYLES = {
  'todo':        { header: 'bg-surface-100 text-surface-600',  dot: 'bg-surface-400' },
  'in-progress': { header: 'bg-blue-50 text-blue-700',         dot: 'bg-blue-500' },
  'done':        { header: 'bg-green-50 text-green-700',       dot: 'bg-green-500' },
}

export default function TaskColumn({ status, tasks = [], onStatusChange, onDelete, onAddTask }) {
  const style = COLUMN_STYLES[status] || COLUMN_STYLES.todo

  return (
    <div className="flex flex-col bg-surface-50 rounded-2xl border border-surface-200 min-h-[480px]">
      {/* Column header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-200">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${style.dot}`} />
          <span className="text-xs font-semibold text-surface-700">{STATUS_LABELS[status]}</span>
          <span className={`badge ${style.header} ml-1`}>{tasks.length}</span>
        </div>
        <button
          onClick={onAddTask}
          className="p-1 rounded-md text-surface-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
          title="Add task"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Task list */}
      <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-xs text-surface-400 mb-2">No tasks here</p>
            <button
              onClick={onAddTask}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium"
            >
              + Add task
            </button>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="relative">
              <TaskCard
                task={task}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
