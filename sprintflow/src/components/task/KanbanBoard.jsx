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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {STATUS_ORDER.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={grouped[status] || []}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onAddTask={() => onAddTask(status)}
        />
      ))}
    </div>
  )
}
