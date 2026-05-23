export default function StatsCard({ label, value, icon, trend, color = 'brand' }) {
  const colors = {
    brand:  { bg: 'bg-brand-50',  icon: 'text-brand-600',  dot: 'bg-brand-500' },
    green:  { bg: 'bg-green-50',  icon: 'text-green-600',  dot: 'bg-green-500' },
    amber:  { bg: 'bg-amber-50',  icon: 'text-amber-600',  dot: 'bg-amber-500' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', dot: 'bg-purple-500' },
  }
  const c = colors[color] || colors.brand

  return (
    <div className="card p-5 hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-surface-500 uppercase tracking-wide mb-2">{label}</p>
          <p className="text-2xl font-bold text-surface-900 font-mono">{value ?? '—'}</p>
          {trend && (
            <p className="text-xs text-surface-500 mt-1.5">{trend}</p>
          )}
        </div>
        <div className={`${c.bg} p-2.5 rounded-xl ${c.icon}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
