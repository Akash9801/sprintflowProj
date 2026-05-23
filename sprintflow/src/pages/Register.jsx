import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Register() {
  const { register, isAuthenticated, loading, error, setError } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
    return () => setError(null)
  }, [isAuthenticated])

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return }
    setSubmitting(true)
    const result = await register(form)
    setSubmitting(false)
    if (result.success) navigate('/dashboard', { replace: true })
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-surface-900">SprintFlow</span>
        </div>

        <h1 className="text-2xl font-bold text-surface-900 mb-1">Create your account</h1>
        <p className="text-sm text-surface-500 mb-8">Start managing your projects in minutes.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Full name</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              className={`input-field ${formErrors.name ? 'border-red-400' : ''}`}
              placeholder="Alex Rivera"
              autoComplete="name"
            />
            {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              className={`input-field ${formErrors.email ? 'border-red-400' : ''}`}
              placeholder="you@company.com"
              autoComplete="email"
            />
            {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              className={`input-field ${formErrors.password ? 'border-red-400' : ''}`}
              placeholder="Min. 6 characters"
              autoComplete="new-password"
            />
            {formErrors.password && <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>}
          </div>

          <div>
            <label className="label">Confirm password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              className={`input-field ${formErrors.confirmPassword ? 'border-red-400' : ''}`}
              placeholder="Repeat password"
              autoComplete="new-password"
            />
            {formErrors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{formErrors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary w-full justify-center py-2.5 mt-2"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account…
              </>
            ) : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 font-medium hover:text-brand-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
