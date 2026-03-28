const listeners = new Set()
const toasts = []
const timers = new Map()

const emit = () => {
  listeners.forEach((listener) => listener([...toasts]))
}

const removeToast = (id) => {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index === -1) return

  toasts.splice(index, 1)
  const timer = timers.get(id)
  if (timer) {
    clearTimeout(timer)
    timers.delete(id)
  }
  emit()
}

export const subscribeToasts = (listener) => {
  listeners.add(listener)
  listener([...toasts])
  return () => listeners.delete(listener)
}

export const pushApiErrorToast = (message) => {
  const id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`
  toasts.push({ id, message: String(message) })

  if (toasts.length > 4) {
    const removed = toasts.shift()
    if (removed) {
      const removedTimer = timers.get(removed.id)
      if (removedTimer) {
        clearTimeout(removedTimer)
        timers.delete(removed.id)
      }
    }
  }

  timers.set(id, setTimeout(() => removeToast(id), 6000))
  emit()
}

export const dismissApiErrorToast = removeToast
