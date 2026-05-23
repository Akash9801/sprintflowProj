import { useState } from 'react'

const COLOR_OPTIONS = [
  '#6366f1', '#ec4899', '#f59e0b', '#10b981',
  '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4',
]

export default function ProjectForm({ onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({ title: '', description: '', color: COLOR_OPTIONS[0] })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    else if (form.title.trim().length < 3) errs.title = 'Title must be at least 3 characters'
    return errs
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    await onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="label">Project Name *</label>
        <input
          type="text"
          value={form.title}
          onChange={handleChange('title')}
          className={`input-field ${errors.title ? 'border-red-400 ring-1 ring-red-400' : ''}`}
          placeholder="e.g. Marketing Website Redesign"
          autoFocus
        />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="label">Description</label>
        <textarea
          value={form.description}
          onChange={handleChange('description')}
          rows={3}
          className="input-field resize-none"
          placeholder="What is this project about?"
        />
      </div>

      {/* Color */}
      <div>
        <label className="label">Project Color</label>
        <div className="flex gap-2 flex-wrap">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, color }))}
              className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${
                form.color === color ? 'ring-2 ring-offset-2 ring-surface-400 scale-110' : ''
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2.5 pt-2">
        <button type="submit" className="btn-primary flex-1" disabled={loading}>
          {loading ? 'Creating…' : 'Create Project'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  )
}
