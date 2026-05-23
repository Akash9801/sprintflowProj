import Modal from './Modal'

/**
 * Reusable confirmation dialog for destructive actions.
 * Usage:
 *   <ConfirmDialog
 *     isOpen={confirmOpen}
 *     onClose={() => setConfirmOpen(false)}
 *     onConfirm={handleDelete}
 *     title="Delete project?"
 *     message="This will permanently delete all tasks in this project."
 *     confirmLabel="Delete"
 *     danger
 *   />
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  loading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      {message && (
        <p className="text-sm text-surface-600 mb-6 leading-relaxed">{message}</p>
      )}
      <div className="flex gap-2.5">
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`flex-1 justify-center ${danger ? 'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500' : 'btn-primary flex-1 justify-center'}`}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
          ) : confirmLabel}
        </button>
        <button onClick={onClose} className="btn-secondary">
          {cancelLabel}
        </button>
      </div>
    </Modal>
  )
}
