import { useState } from 'react'
import { logIn, logOut, signUp, useSync, type SyncState } from '../lib/sync'

function statusText(s: SyncState): string {
  switch (s.status) {
    case 'syncing':
      return 'Syncing…'
    case 'synced':
      return s.lastSyncedAt ? `Synced at ${new Date(s.lastSyncedAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}` : 'Synced'
    case 'offline':
      return "Offline. Changes are saved here and will sync when you're back online."
    case 'error':
      return s.error ?? 'Sync failed.'
    default:
      return 'Ready'
  }
}

/** Sign up / log in to sync progress across devices. Hidden when there's no server. */
export function AccountPanel() {
  const sync = useSync()
  if (sync.available === false) return null

  return (
    <section className="panel account-panel">
      <h2>Account & sync</h2>
      {sync.available === null ? (
        <p className="muted">Checking…</p>
      ) : sync.user ? (
        <div className="account-signed-in">
          <div>
            <p>
              Signed in as <strong>{sync.user.email}</strong>
            </p>
            <p className={`sync-status ${sync.status}`} role="status">
              <span className="sync-dot" aria-hidden /> {statusText(sync)}
            </p>
          </div>
          <button className="btn ghost" onClick={() => void logOut()}>
            Log out
          </button>
        </div>
      ) : (
        <AuthForm />
      )}
    </section>
  )
}

function AuthForm() {
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const err = await (mode === 'signup' ? signUp : logIn)(email, password)
    setBusy(false)
    if (err) setError(err)
  }

  return (
    <form className="auth-form" onSubmit={submit}>
      <p className="muted">
        {mode === 'signup'
          ? 'Create an account to keep your progress in sync across devices. Everything you have on this device comes with you.'
          : 'Log in to sync this device with your account. Progress here is merged in, so nothing is lost.'}
      </p>
      <div className="auth-fields">
        <label>
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            minLength={mode === 'signup' ? 8 : undefined}
            required
          />
        </label>
      </div>
      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}
      <div className="row">
        <button className="btn primary" type="submit" disabled={busy}>
          {busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'}
        </button>
        <button
          type="button"
          className="link-btn"
          onClick={() => {
            setMode(mode === 'signup' ? 'login' : 'signup')
            setError(null)
          }}
        >
          {mode === 'signup' ? 'Already have an account? Log in' : 'New here? Create an account'}
        </button>
      </div>
    </form>
  )
}
