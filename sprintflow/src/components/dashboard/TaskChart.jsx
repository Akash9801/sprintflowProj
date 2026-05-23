import { TASK_STATUS, STATUS_LABELS } from '../../utils/constants'

const STATUS_COLORS = {
  [TASK_STATUS.TODO]:        { bar: 'bg-surface-300', text: 'text-surface-500' },
  [TASK_STATUS.IN_PROGRESS]: { bar: 'bg-brand-500',   text: 'text-brand-600' },
  [TASK_STATUS.DONE]:        { bar: 'bg-green-500',   text: 'text-green-600' },
}

export default function TaskChart({ tasks = [] }) {
  const counts = {
    [TASK_STATUS.TODO]:        tasks.filter((t) => t.status === TASK_STATUS.TODO).length,
    [TASK_STATUS.IN_PROGRESS]: tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS).length,
    [TASK_STATUS.DONE]:        tasks.filter((t) => t.status === TASK_STATUS.DONE).length,
  }
  const total = tasks.length || 1

  return (
    <div className="card p-5">
      <h2 className="text-sm font-semibold text-surface-900 mb-5">Task Breakdown</h2>

      <div className="space-y-3.5">
        {Object.entries(counts).map(([status, count]) => {
          const pct = Math.round((count / total) * 100)
          const c = STATUS_COLORS[status]
          return (
            <div key={status}>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-medium ${c.text}`}>{STATUS_LABELS[status]}</span>
                <span className="text-xs font-mono font-semibold text-surface-700">{count}</span>
              </div>
              <div className="w-full bg-surface-100 rounded-full h-2">
                <div
                  className={`${c.bar} h-2 rounded-full transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-surface-400 mt-4">{total} tasks total across all projects</p>
    </div>
  )
}
