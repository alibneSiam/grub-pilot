export const isValidEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(String(value || '').trim())

export const isCommureEmail = (value) => /[^\s@]+@commure\.com$/i.test(String(value || '').trim())

export const hasText = (value) => String(value || '').trim().length > 0

export const isStrongPassword = (value) => String(value || '').length >= 8
