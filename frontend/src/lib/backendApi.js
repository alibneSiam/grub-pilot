const DEFAULT_BASE_URL = 'https://grub-pilot-backend.onrender.com'
const COMMURE_EMAIL_MESSAGE = 'Valid commure emails are able to avail this service.'

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '/api' : DEFAULT_BASE_URL)).replace(/\/$/, '')

let pingPromise = null

const buildUrl = (path, params) => {
  const resolvedPath = path.startsWith('http')
    ? path
    : `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`

  const url = API_BASE_URL.startsWith('http')
    ? new URL(resolvedPath)
    : new URL(resolvedPath, window.location.origin)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value)
      }
    })
  }

  return url
}

const formatErrorMessage = (value, fallback) => {
  if (typeof value === 'string') {
    if (value.includes('String should match pattern') || value.includes('@commure.com')) {
      return COMMURE_EMAIL_MESSAGE
    }
    return value
  }
  if (Array.isArray(value)) {
    return value.map((item) => formatErrorMessage(item, fallback)).filter(Boolean).join(', ')
  }
  if (value && typeof value === 'object') {
    const detail = value.message || value.detail || value.msg || ''
    const pattern = value?.ctx?.pattern || value?.pattern || ''

    if (
      String(detail).includes('String should match pattern') ||
      String(pattern).includes('commure\\.com') ||
      String(detail).includes('@commure.com')
    ) {
      return COMMURE_EMAIL_MESSAGE
    }

    return detail || fallback
  }
  return fallback
}

export async function apiRequest(path, { method = 'GET', body, params } = {}) {
  try {
    const response = await fetch(buildUrl(path, params), {
      method,
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    const rawText = await response.text()
    let data = null

    if (rawText) {
      try {
        data = JSON.parse(rawText)
      } catch {
        data = rawText
      }
    }

    if (!response.ok) {
      const message = formatErrorMessage(
        data?.detail || data?.message || data,
        `Request failed (${response.status})`
      )

      const error = new Error(message)
      throw error
    }

    return data
  } catch (error) {
    throw error
  }
}

export function pingBackend() {
  if (!pingPromise) {
    pingPromise = fetch(API_BASE_URL, { method: 'GET', cache: 'no-store' }).catch(() => null)
  }

  return pingPromise
}
