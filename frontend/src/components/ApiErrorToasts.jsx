import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { dismissApiErrorToast, subscribeToasts } from '../lib/toastStore'

const ApiErrorToasts = () => {
  const [toasts, setToasts] = useState([])

  useEffect(() => subscribeToasts(setToasts), [])

  if (!toasts.length) return null

  return document.body ? createPortal(
    <div className="fixed bottom-4 right-4 z-50 flex w-[min(92vw,380px)] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 rounded-xl border border-red-300/30 bg-black/90 px-4 py-3 text-sm text-red-100 shadow-2xl backdrop-blur-md"
        >
          <div className="flex-1 leading-relaxed">{toast.message}</div>
          <button
            type="button"
            onClick={() => dismissApiErrorToast(toast.id)}
            className="rounded-md px-2 py-1 text-lg leading-none text-red-100/80 transition hover:bg-white/10 hover:text-red-50"
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      ))}
    </div>,
    document.body,
  ) : null
}

export default ApiErrorToasts
