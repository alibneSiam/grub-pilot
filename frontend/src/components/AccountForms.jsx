import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { apiRequest } from '../lib/backendApi'
import FloatingField from './FloatingField'
import { hasText, isCommureEmail, isStrongPassword } from '../lib/validation'

const emptyPreferences = ['cbf', 'cbf', 'cbf', 'cbf', 'cbf']

const AccountForms = ({ onSignupSuccess, onAutoSignIn }) => {
  const [inviteStatus, setInviteStatus] = useState({ kind: 'idle', message: '' })
  const [inviteEmail, setInviteEmail] = useState('')
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const [signup, setSignup] = useState({
    requestId: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [signupStatus, setSignupStatus] = useState({ kind: 'idle', message: '' })

  const statusClass = useMemo(() => ({
    idle: 'text-gray-300',
    loading: 'text-orange-200',
    success: 'text-green-300',
    error: 'text-red-300',
  }), [])

  const primaryButtonClass = 'mt-4 min-h-[48px] w-full cursor-pointer rounded-md bg-orange-400 px-4 py-2 font-semibold text-black transition-all duration-300 hover:bg-orange-500'
  const buttonInteractiveClass = 'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300'

  const inviteValid = isCommureEmail(inviteEmail)
  const signupValid = hasText(signup.requestId) && isCommureEmail(signup.email) && isStrongPassword(signup.password) && signup.password === signup.confirmPassword

  const submitInvitation = async (event) => {
    event.preventDefault()
    if (!inviteValid) {
      setInviteStatus({ kind: 'error', message: 'Valid commure emails are able to avail this service.' })
      return
    }

    setInviteStatus({ kind: 'loading', message: 'Requesting invitation...' })

    try {
      const data = await apiRequest('/invitation-requests', {
        method: 'POST',
        body: { email: inviteEmail },
      })

      setInviteStatus({
        kind: 'success',
        message: data?.message || 'Invitation request submitted.',
      })
    } catch (error) {
      setInviteStatus({ kind: 'error', message: error.message })
    }
  }

  const submitSignup = async (event) => {
    event.preventDefault()

    if (!signupValid) {
      setSignupStatus({ kind: 'error', message: 'Valid commure emails are able to avail this service.' })
      return
    }

    setTermsAccepted(false)
    setShowTermsModal(true)
  }

  const performSignup = async () => {
    if (signup.password !== signup.confirmPassword) {
      setSignupStatus({ kind: 'error', message: 'Passwords do not match.' })
      return
    }

    setSignupStatus({ kind: 'loading', message: 'Creating account...' })

    try {
      const data = await apiRequest('/signup', {
        method: 'POST',
        body: {
          request_id: signup.requestId,
          email: signup.email,
          password: signup.password,
          preferences: emptyPreferences,
        },
      })

      setSignupStatus({
        kind: 'success',
        message: data?.message || 'Signup complete.',
      })
      setTermsAccepted(false)
      onAutoSignIn?.({ email: signup.email, currentPassword: signup.password })
      onSignupSuccess?.({ email: signup.email, currentPassword: signup.password })
      setSignup((current) => ({
        ...current,
        requestId: '',
        password: '',
        confirmPassword: '',
      }))
    } catch (error) {
      setSignupStatus({ kind: 'error', message: error.message })
    }
  }

  return (
    <div className="h-full space-y-4">
      <section className="space-y-2 rounded-xl border border-orange-400/30 bg-black/20 p-6">
        <h3 className="mb-1 text-left text-2xl font-semibold">Request Invitation</h3>
        <form onSubmit={submitInvitation} className="space-y-1">
          <FloatingField
            label="Email"
            type="email"
            placeholder="name@commure.com"
            value={inviteEmail}
            onChange={(event) => setInviteEmail(event.target.value)}
            required
          />
          <button disabled={!inviteValid || inviteStatus.kind === 'loading'} className={`${primaryButtonClass} ${buttonInteractiveClass} cursor-pointer`}>
            ✉️ Request Invitation
          </button>
        </form>
        <p className={`mt-3 text-sm ${statusClass[inviteStatus.kind]}`}>{inviteStatus.message}</p>
      </section>

      <section className="space-y-2 rounded-xl border border-orange-400/30 bg-black/20 p-6">
        <h3 className="mb-1 text-left text-2xl font-semibold">Create Account</h3>
        <form onSubmit={submitSignup} className="space-y-1">
          <div className="grid gap-1 md:grid-cols-2">
            <FloatingField
              label="Invitation Code"
              placeholder="Invitation code"
              value={signup.requestId}
              onChange={(event) => setSignup((current) => ({ ...current, requestId: event.target.value }))}
              required
            />
            <FloatingField
              label="Email"
              type="email"
              placeholder="name@commure.com"
              value={signup.email}
              onChange={(event) => setSignup((current) => ({ ...current, email: event.target.value }))}
              required
            />
            <FloatingField
              label="Password"
              type="password"
              placeholder="Password"
              value={signup.password}
              onChange={(event) => setSignup((current) => ({ ...current, password: event.target.value }))}
              required
            />
            <FloatingField
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              value={signup.confirmPassword}
              onChange={(event) => setSignup((current) => ({ ...current, confirmPassword: event.target.value }))}
              required
            />
          </div>

          <button disabled={!signupValid || signupStatus.kind === 'loading'} className={`${primaryButtonClass} ${buttonInteractiveClass} cursor-pointer`}>
            🧾 Sign Up
          </button>
        </form>
        <p className={`mt-3 text-sm ${statusClass[signupStatus.kind]}`}>{signupStatus.message}</p>
      </section>

      {showTermsModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-orange-400/30 bg-[#0c0c0c] p-6 text-left shadow-2xl">
            <h4 className="text-2xl font-semibold text-white">Terms & Conditions</h4>
            <p className="mt-3 text-sm text-amber-100/80">
              By continuing, you confirm that you understand the risks associated with using GrubPilot and agree that GrubPilot will not be liable in any case or form.
            </p>
            <label className="mt-4 flex items-start gap-3 text-sm text-amber-100/90">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                className="mt-1 accent-orange-400"
              />
              <span>I understand and accept these terms.</span>
            </label>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="cursor-pointer rounded-md bg-white/10 px-4 py-2 font-semibold text-amber-100 transition hover:bg-white/15"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!termsAccepted}
                onClick={async () => {
                  setShowTermsModal(false)
                  await performSignup()
                }}
                className="cursor-pointer rounded-md bg-orange-400 px-4 py-2 font-semibold text-black transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Accept & Sign Up
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default AccountForms
