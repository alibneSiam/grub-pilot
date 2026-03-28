import { useMemo, useState } from 'react'
import { apiRequest } from '../lib/backendApi'
import FloatingField from './FloatingField'
import { hasText, isCommureEmail, isStrongPassword } from '../lib/validation'

const ForgotPassword = () => {
  const [forgot, setForgot] = useState({
    email: '',
    invitationCode: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [forgotStatus, setForgotStatus] = useState({ kind: 'idle', message: '' })

  const statusClass = useMemo(() => ({
    idle: 'text-gray-300',
    loading: 'text-orange-200',
    success: 'text-green-300',
    error: 'text-red-300',
  }), [])

  const buttonClass = 'mt-4 min-h-[48px] w-full cursor-pointer rounded-md bg-orange-400 px-4 py-2 font-semibold text-black transition-all duration-300 hover:bg-orange-500'
  const buttonInteractiveClass = 'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300'
  const canSubmit = isCommureEmail(forgot.email) && hasText(forgot.invitationCode) && isStrongPassword(forgot.newPassword) && forgot.newPassword === forgot.confirmNewPassword

  const submitForgotPassword = async (event) => {
    event.preventDefault()
    if (!canSubmit) {
      setForgotStatus({ kind: 'error', message: 'Valid commure emails are able to avail this service.' })
      return
    }
    setForgotStatus({ kind: 'loading', message: 'Resetting password...' })

    try {
      const data = await apiRequest('/users/password/forgot', {
        method: 'POST',
        body: {
          email: forgot.email,
          invitation_code: forgot.invitationCode,
          new_password: forgot.newPassword,
        },
      })

      setForgotStatus({
        kind: 'success',
        message: data?.message || 'Password updated.',
      })
      setForgot((current) => ({ ...current, invitationCode: '', newPassword: '', confirmNewPassword: '' }))
    } catch (error) {
      setForgotStatus({ kind: 'error', message: error.message })
    }
  }

  return (
    <div className="h-full space-y-4 rounded-xl border border-orange-400/30 bg-black/20 p-6">
      <form onSubmit={submitForgotPassword} className="space-y-2">
        <div className="grid gap-2 md:grid-cols-2">
          <FloatingField
            label="Email"
            type="email"
            placeholder="name@commure.com"
            value={forgot.email}
            onChange={(event) => setForgot((current) => ({ ...current, email: event.target.value }))}
            required
          />
          <FloatingField
            label="Invitation Code"
            placeholder="Invitation code"
            value={forgot.invitationCode}
            onChange={(event) => setForgot((current) => ({ ...current, invitationCode: event.target.value }))}
            required
          />
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          <FloatingField
            label="New Password"
            type="password"
            placeholder="New password"
            value={forgot.newPassword}
            onChange={(event) => setForgot((current) => ({ ...current, newPassword: event.target.value }))}
            required
          />
          <FloatingField
            label="Confirm New Password"
            type="password"
            placeholder="Confirm password"
            value={forgot.confirmNewPassword}
            onChange={(event) => setForgot((current) => ({ ...current, confirmNewPassword: event.target.value }))}
            required
          />
        </div>

        <button disabled={!canSubmit || forgotStatus.kind === 'loading'} className={`${buttonClass} ${buttonInteractiveClass} cursor-pointer`}>
          🪄 Reset Password
        </button>
      </form>
      <p className={`mt-3 text-sm ${statusClass[forgotStatus.kind]}`}>{forgotStatus.message}</p>
    </div>
  )
}

export default ForgotPassword
