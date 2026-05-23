const columns = [
  {
    title: 'To Do',
    dot: 'bg-surface-400',
    bg: 'bg-surface-50',
    count: 4,
    tasks: [
      { title: 'Redesign onboarding flow', priority: 'High', priorityColor: 'text-red-600 bg-red-50', assignee: 'K', deadline: 'Jun 12' },
      { title: 'Write API documentation', priority: 'Medium', priorityColor: 'text-amber-600 bg-amber-50', assignee: 'M', deadline: 'Jun 18' },
      { title: 'Set up staging environment', priority: 'Low', priorityColor: 'text-green-600 bg-green-50', assignee: 'A', deadline: 'Jun 20' },
    ],
  },
  {
    title: 'In Progress',
    dot: 'bg-yellow-400',
    bg: 'bg-yellow-50/50',
    count: 3,
    tasks: [
      { title: 'Implement Kanban drag & drop', priority: 'High', priorityColor: 'text-red-600 bg-red-50', assignee: 'R', deadline: 'Jun 10' },
      { title: 'Integrate payment gateway', priority: 'Urgent', priorityColor: 'text-purple-600 bg-purple-50', assignee: 'S', deadline: 'Jun 9' },
    ],
  },
  {
    title: 'Done',
    dot: 'bg-green-400',
    bg: 'bg-green-50/50',
    count: 8,
    tasks: [
      { title: 'Set up MongoDB Atlas cluster', priority: 'High', priorityColor: 'text-red-600 bg-red-50', assignee: 'A', deadline: 'Jun 1' },
      { title: 'Deploy backend to Render', priority: 'Medium', priorityColor: 'text-amber-600 bg-amber-50', assignee: 'K', deadline: 'Jun 3' },
    ],
  },
]

function TaskCard({ task, done }) {
  return (
    <div className={`bg-white rounded-xl border border-surface-200 p-3.5 shadow-card ${done ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${task.priorityColor}`}>
          {task.priority}
        </span>
        {done && (
          <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        )}
      </div>
      <p className={`text-sm font-medium text-surface-800 leading-snug mb-3 ${done ? 'line-through text-surface-400' : ''}`}>
        {task.title}
      </p>
      <div className="flex items-center justify-between">
        <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
          <span className="text-[10px] font-bold text-brand-700">{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-surface-400">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
          {task.deadline}
        </div>
      </div>
    </div>
  )
}

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-surface-50 border border-surface-200 text-surface-600 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
            Visual workflow
          </div>
          <h2 className="text-4xl font-bold text-surface-900 tracking-tight mb-4">
            Your Kanban board, always in sync
          </h2>
          <p className="text-surface-500 text-lg max-w-xl mx-auto leading-relaxed">
            See exactly where every task stands. Move work forward with one click — no friction, no confusion.
          </p>
        </div>

        {/* Kanban */}
        <div className="grid md:grid-cols-3 gap-4">
          {columns.map((col) => (
            <div key={col.title} className={`${col.bg} rounded-2xl border border-surface-200 p-4`}>
              {/* Column header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className="text-sm font-semibold text-surface-800">{col.title}</span>
                </div>
                <span className="text-xs font-semibold text-surface-400 bg-surface-100 px-2 py-0.5 rounded-full">
                  {col.count}
                </span>
              </div>

              {/* Tasks */}
              <div className="flex flex-col gap-2.5">
                {col.tasks.map(task => (
                  <TaskCard key={task.title} task={task} done={col.title === 'Done'} />
                ))}

                {/* Add task placeholder */}
                <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-surface-400 hover:text-surface-600 hover:bg-white/70 rounded-xl border border-dashed border-surface-200 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
