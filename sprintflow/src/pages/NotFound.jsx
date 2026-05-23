import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-100 mb-6">
          <span className="text-2xl font-bold text-surface-400 font-mono">404</span>
        </div>
        <h1 className="text-xl font-bold text-surface-900 mb-2">Page not found</h1>
        <p className="text-sm text-surface-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/dashboard" className="btn-primary justify-center">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
