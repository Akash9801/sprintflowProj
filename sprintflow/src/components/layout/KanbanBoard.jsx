import TaskColumn from './TaskColumn'
import { STATUS_ORDER } from '../../utils/constants'
import { groupTasksByStatus } from '../../utils/helpers'
import Loader from '../common/Loader'

export default function KanbanBoard({ tasks = [], loading, onStatusChange, onDelete, onAddTask }) {
  const grouped = groupTasksByStatus(tasks)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader size="lg" text="Loading board…" />
      </div>
    )
  }

  return (
    // On mobile: horizontal scroll so columns stay side-by-side and readable
    // On md+: proper 3-column grid
    <div className="
      flex gap-4 overflow-x-auto pb-4
      md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0
    ">
      {STATUS_ORDER.map((status) => (
        <div
          key={status}
          // Each column has a min-width on mobile so cards don't get crushed
          className="min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink"
        >
          <TaskColumn
            status={status}
            tasks={grouped[status] || []}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onAddTask={() => onAddTask(status)}
          />
        </div>
      ))}
    </div>
  )
}
