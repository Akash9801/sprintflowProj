import { useState } from 'react'
import { TASK_PRIORITY, TASK_STATUS, PRIORITY_LABELS, STATUS_LABELS } from '../../utils/constants'

export default function TaskForm({ projectId, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: TASK_PRIORITY.MEDIUM,
    status: TASK_STATUS.TODO,
    deadline: '',
    assignee: '',
    projectId,
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Task title is required'
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
        <label className="label">Task Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={handleChange('title')}
          className={`input-field ${errors.title ? 'border-red-400' : ''}`}
          placeholder="e.g. Implement user authentication"
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
          rows={2}
          className="input-field resize-none"
          placeholder="Optional details…"
        />
      </div>

      {/* Priority + Status row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Priority</label>
          <select value={form.priority} onChange={handleChange('priority')} className="input-field">
            {Object.entries(PRIORITY_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Status</label>
          <select value={form.status} onChange={handleChange('status')} className="input-field">
            {Object.entries(STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignee + Deadline row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Assignee</label>
          <input
            type="text"
            value={form.assignee}
            onChange={handleChange('assignee')}
            className="input-field"
            placeholder="Name"
          />
        </div>
        <div>
          <label className="label">Deadline</label>
          <input
            type="date"
            value={form.deadline}
            onChange={handleChange('deadline')}
            className="input-field"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2.5 pt-1">
        <button type="submit" className="btn-primary flex-1" disabled={loading}>
          {loading ? 'Creating…' : 'Create Task'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  )
}
