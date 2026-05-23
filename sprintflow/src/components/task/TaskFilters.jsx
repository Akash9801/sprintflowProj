import { TASK_STATUS, TASK_PRIORITY, STATUS_LABELS, PRIORITY_LABELS } from '../../utils/constants'

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: TASK_STATUS.TODO, label: STATUS_LABELS[TASK_STATUS.TODO] },
  { value: TASK_STATUS.IN_PROGRESS, label: STATUS_LABELS[TASK_STATUS.IN_PROGRESS] },
  { value: TASK_STATUS.DONE, label: STATUS_LABELS[TASK_STATUS.DONE] },
]

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All Priorities' },
  { value: TASK_PRIORITY.LOW, label: PRIORITY_LABELS[TASK_PRIORITY.LOW] },
  { value: TASK_PRIORITY.MEDIUM, label: PRIORITY_LABELS[TASK_PRIORITY.MEDIUM] },
  { value: TASK_PRIORITY.HIGH, label: PRIORITY_LABELS[TASK_PRIORITY.HIGH] },
  { value: TASK_PRIORITY.URGENT, label: PRIORITY_LABELS[TASK_PRIORITY.URGENT] },
]

export default function TaskFilters({ filters, onChange, taskCount }) {
  const handleChange = (field) => (e) => {
    onChange({ ...filters, [field]: e.target.value })
  }

  const hasActiveFilter = filters.status !== 'all' || filters.priority !== 'all'

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status filter */}
      <div className="flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        <select
          value={filters.status}
          onChange={handleChange('status')}
          className="text-xs font-medium bg-white border border-surface-200 text-surface-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
        >
          {STATUS_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Priority filter */}
      <select
        value={filters.priority}
        onChange={handleChange('priority')}
        className="text-xs font-medium bg-white border border-surface-200 text-surface-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
      >
        {PRIORITY_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {/* Clear filters */}
      {hasActiveFilter && (
        <button
          onClick={() => onChange({ status: 'all', priority: 'all' })}
          className="text-xs text-brand-600 hover:text-brand-700 font-medium"
        >
          Clear filters
        </button>
      )}

      {/* Count */}
      <span className="text-xs text-surface-400 ml-auto">
        {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
      </span>
    </div>
  )
}
