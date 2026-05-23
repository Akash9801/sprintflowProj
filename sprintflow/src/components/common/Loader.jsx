export default function Loader({ size = 'md', text = null, className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className={`${sizes[size]} rounded-full border-brand-200 border-t-brand-600 animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-sm text-surface-500 font-medium">{text}</p>}
    </div>
  )
}
