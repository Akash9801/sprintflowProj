import { Link } from 'react-router-dom'

function DashboardMockup() {
  return (
    <div className="relative w-full">
      {/* Glow behind mockup */}
      <div className="absolute -inset-4 bg-brand-500/10 rounded-3xl blur-2xl" />

      {/* Main window */}
      <div className="relative bg-white rounded-2xl border border-surface-200 shadow-modal overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-50 border-b border-surface-200">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-3 flex-1 bg-surface-200 rounded-md h-5 max-w-[180px]" />
        </div>

        <div className="flex h-[340px]">
          {/* Sidebar */}
          <div className="w-44 bg-surface-50 border-r border-surface-100 p-3 flex flex-col gap-1 flex-shrink-0">
            <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
              <div className="w-5 h-5 rounded bg-brand-600" />
              <div className="h-3 w-20 bg-surface-300 rounded" />
            </div>
            {[
              { icon: '⊞', label: 'Dashboard', active: true },
              { icon: '◈', label: 'Projects' },
              { icon: '✦', label: 'My Tasks' },
              { icon: '◉', label: 'Analytics' },
            ].map(item => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs ${
                  item.active
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-surface-500'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 overflow-hidden">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'Projects', value: '12', color: 'bg-brand-100 text-brand-700' },
                { label: 'In Progress', value: '28', color: 'bg-yellow-100 text-yellow-700' },
                { label: 'Completed', value: '94', color: 'bg-green-100 text-green-700' },
              ].map(stat => (
                <div key={stat.label} className="bg-surface-50 rounded-xl p-2.5 border border-surface-100">
                  <div className={`text-xs font-semibold mb-0.5 ${stat.color} inline-block px-1.5 py-0.5 rounded`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-surface-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Kanban preview */}
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  col: 'To Do',
                  color: 'text-surface-600',
                  dot: 'bg-surface-400',
                  tasks: ['Design system audit', 'API rate limiting'],
                },
                {
                  col: 'In Progress',
                  color: 'text-yellow-700',
                  dot: 'bg-yellow-400',
                  tasks: ['Auth flow refactor', 'Dashboard metrics'],
                },
                {
                  col: 'Done',
                  color: 'text-green-700',
                  dot: 'bg-green-400',
                  tasks: ['Setup CI/CD', 'DB schema'],
                },
              ].map(col => (
                <div key={col.col} className="bg-surface-50 rounded-xl p-2 border border-surface-100">
                  <div className={`flex items-center gap-1.5 text-[10px] font-semibold mb-2 ${col.color}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                    {col.col}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {col.tasks.map(task => (
                      <div
                        key={task}
                        className="bg-white rounded-lg p-2 border border-surface-100 shadow-sm"
                      >
                        <div className="text-[10px] font-medium text-surface-700 leading-tight">{task}</div>
                        <div className="flex items-center gap-1 mt-1.5">
                          <div className="w-3.5 h-3.5 rounded-full bg-brand-200 flex items-center justify-center">
                            <span className="text-[7px] font-bold text-brand-700">A</span>
                          </div>
                          <div className="h-1.5 w-8 bg-surface-200 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-card-hover border border-surface-200 px-3 py-2 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-surface-800">Sprint Complete</div>
          <div className="text-[9px] text-surface-400">14 tasks shipped</div>
        </div>
      </div>

      {/* Floating avatar stack */}
      <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-card-hover border border-surface-200 px-3 py-2 flex items-center gap-2">
        <div className="flex -space-x-1.5">
          {['bg-brand-400', 'bg-purple-400', 'bg-pink-400'].map((c, i) => (
            <div key={i} className={`w-5 h-5 rounded-full ${c} border-2 border-white`} />
          ))}
        </div>
        <div className="text-[10px] font-medium text-surface-600">3 active now</div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-white">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#1a2035 1px, transparent 1px), linear-gradient(90deg, #1a2035 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-200 rounded-full blur-[120px] opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-200 rounded-full blur-[100px] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col gap-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold px-3.5 py-1.5 rounded-full w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Now in production — free to use
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-surface-900 leading-[1.08] tracking-tight">
              Manage projects.
              <br />
              <span className="text-brand-600">Ship faster.</span>
              <br />
              Stay aligned.
            </h1>
            <p className="text-lg text-surface-500 leading-relaxed max-w-md">
              SprintFlow brings your team's work into one Kanban-powered workspace. Plan sprints, track tasks, and deliver without the chaos.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Start for free
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-surface-200 text-surface-700 font-semibold text-sm rounded-xl hover:border-surface-300 hover:bg-surface-50 transition-all duration-200 shadow-sm"
            >
              Log in
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 text-sm text-surface-400">
            <div className="flex -space-x-2">
              {['bg-brand-400', 'bg-purple-400', 'bg-pink-400', 'bg-amber-400'].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white`} />
              ))}
            </div>
            <span>Trusted by <strong className="text-surface-600">2,400+</strong> teams worldwide</span>
          </div>
        </div>

        {/* Right — mockup */}
        <div className="relative hidden lg:block">
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}
