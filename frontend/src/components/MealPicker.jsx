import ProteinPicker from "./ProteinPicker"
import Snack from "./Snack"
import { useEffect, useMemo, useRef, useState } from "react"
import { apiRequest } from "../lib/backendApi"
import { hasText } from "../lib/validation"
import FloatingField from "./FloatingField"

const MealPicker = ({ defaultEmail = "", defaultCurrentPassword = "" }) => {
    const [preferences, setPreferences] = useState(Array(5).fill("cbf"))
    const [savedPreferences, setSavedPreferences] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(defaultCurrentPassword)
    const [email, setEmail] = useState(defaultEmail)
    const [signedInEmail, setSignedInEmail] = useState("")
    const [showSignIn, setShowSignIn] = useState(true)
    const [loadStatus, setLoadStatus] = useState({ kind: "idle", message: "" })
    const [saveStatus, setSaveStatus] = useState({ kind: "idle", message: "" })
    const autoLoadKeyRef = useRef("")

    const canLoad = useMemo(() => hasText(email) && hasText(currentPassword), [email, currentPassword])
    const hasPreferenceChanges = useMemo(() => {
        if (!savedPreferences) return false
        return preferences.join('') !== savedPreferences.join('')
    }, [preferences, savedPreferences])
    const canSubmit = useMemo(() => hasText(email) && hasText(currentPassword) && hasPreferenceChanges, [email, currentPassword, hasPreferenceChanges])

    const updatePreference = (index, value) => {
        setPreferences((current) => {
            const next = [...current]
            next[index] = value
            return next
        })
    }

    const loadPreferences = async (overrideEmail = email, overridePassword = currentPassword) => {
        if (!hasText(overrideEmail) || !hasText(overridePassword)) {
            setLoadStatus({ kind: "error", message: "Enter your email and current password." })
            return
        }

        setLoadStatus({ kind: "loading", message: "Loading preferences..." })
        setSaveStatus({ kind: "idle", message: "" })

        try {
            const data = await apiRequest("/users/preferences", {
                method: "POST",
                body: { email: overrideEmail, current_password: overridePassword },
            })

            if (Array.isArray(data?.preferences) && data.preferences.length === 5) {
                setPreferences(data.preferences)
                setSavedPreferences(data.preferences)
            }

            setSignedInEmail(overrideEmail)
            setShowSignIn(false)
            setLoadStatus({ kind: "success", message: "Preferences loaded." })
        } catch (error) {
            setLoadStatus({ kind: "error", message: error.message })
        }
    }

    const signedIn = Boolean(signedInEmail)

    useEffect(() => {
        const key = `${defaultEmail}:${defaultCurrentPassword}`
        if (!defaultEmail || !defaultCurrentPassword || autoLoadKeyRef.current === key) return

        autoLoadKeyRef.current = key
        loadPreferences(defaultEmail, defaultCurrentPassword)
    }, [defaultEmail, defaultCurrentPassword])

    const submitPreferences = async (event) => {
        event.preventDefault()

        if (!canSubmit) {
            setSaveStatus({ kind: "error", message: "Enter your email and current password." })
            return
        }

        setSaveStatus({ kind: "loading", message: "Saving preferences..." })
        setLoadStatus({ kind: "idle", message: "" })

        try {
            const data = await apiRequest("/users/preferences", {
                method: "PATCH",
                body: {
                    email,
                    current_password: currentPassword,
                    preferences,
                },
            })

            setSaveStatus({ kind: "success", message: data?.message || "Meal preferences updated." })
            setSavedPreferences(preferences)
        } catch (error) {
            setSaveStatus({ kind: "error", message: error.message })
        }
    }

    const statusClasses = {
        idle: "text-gray-300",
        loading: "text-orange-200",
        success: "text-green-300",
        error: "text-red-300",
    }

    return (
        <form onSubmit={submitPreferences} className="py-4">
            <div className="space-y-6 rounded-xl border border-orange-400/30 bg-black/20 p-6 text-left">
                {signedIn && (
                    <div className="flex items-center justify-between rounded-lg border border-green-300/30 bg-green-400/10 px-4 py-3 text-green-100">
                        <span>Signed in as {signedInEmail}</span>
                        <button
                            type="button"
                            onClick={() => setShowSignIn((current) => !current)}
                            className="cursor-pointer rounded-md bg-white/10 px-3 py-1 text-sm font-semibold transition hover:bg-white/15"
                        >
                            {showSignIn ? 'Hide Form' : 'Show Form'}
                        </button>
                    </div>
                )}

                <section className="space-y-2">
                    <h3 className="text-left text-2xl font-semibold">Meal Preferences</h3>
                    <p className="text-sm text-amber-100/80">
                        Manage your cafeteria preferences directly.
                    </p>
                    {showSignIn && (
                        <div className="grid gap-2 md:grid-cols-[1fr_1fr_220px]">
                            <FloatingField
                                label="Email"
                                type="email"
                                placeholder="name@commure.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            <FloatingField
                                label="Current Password"
                                type="password"
                                placeholder="Current password"
                                value={currentPassword}
                                onChange={(event) => setCurrentPassword(event.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => loadPreferences()}
                                disabled={!canLoad || loadStatus.kind === "loading"}
                                className="mt-2 cursor-pointer rounded-md bg-white/10 px-4 py-2 font-semibold text-amber-100 transition-all duration-300 hover:scale-[1.01] hover:bg-white/15 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                            >
                                🔑 Load Preferences
                            </button>
                        </div>
                    )}
                    <p className={`mt-3 text-sm ${statusClasses[loadStatus.kind]}`}>{loadStatus.message}</p>
                </section>

                {signedIn && (
                  <section className="space-y-4">
                      <ProteinPicker preferences={preferences} onPreferenceChange={updatePreference} />
                      <div className="my-6">
                          <Snack />
                      </div>
                      <button disabled={!canSubmit || saveStatus.kind === "loading"} className="relative mt-5 inline-block w-full cursor-pointer p-4 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] before:block before:absolute before:-inset-1 before:-skew-y-2 before:bg-orange-400 before:transition-all before:duration-300 before:ease-out hover:before:skew-y-0 hover:before:bg-orange-600 text-black hover:text-black font-semibold disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100">
                            <span className="relative">
                                 🥗 Update Meal Preference
                            </span>
                        </button>
                      <p className={`mt-3 text-sm ${statusClasses[saveStatus.kind]}`}>{saveStatus.message}</p>
                  </section>
                )}
            </div>
        </form>
    )
}

export default MealPicker
