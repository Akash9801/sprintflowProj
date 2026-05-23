export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-surface-100 flex items-center justify-center mb-4 text-surface-400">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-semibold text-surface-800 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-surface-500 max-w-xs mb-5">{description}</p>
      )}
      {action && action}
    </div>
  )
}
