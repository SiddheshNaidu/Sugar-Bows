import { useUIStore } from '@/store/uiStore'

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          onClick={() => removeToast(toast.id)}
          role="alert"
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
