import { useState, useEffect } from 'react'
import './RegisterModal.css'

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [registered, setRegistered] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setRegistered(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setRegistered(true)
  }

  return (
    <div className="register-modal" role="dialog" aria-modal="true" aria-label="Register">
      <div className="register-modal__overlay" onClick={onClose} />
      <div className="register-modal__content">
        <button type="button" className="register-modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 14 14" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 13L1 1M13 1L1 13" />
          </svg>
        </button>

        <div className="register-modal__form-wrap">
          <h3 className="register-modal__title">Create Account</h3>
          <p className="register-modal__subtitle">Please fill in the details below:</p>

          {registered ? (
            <div className="register-modal__success">
              Your account has been created! You can now{' '}
              <button type="button" className="register-modal__text-link" onClick={onSwitchToLogin}>
                login
              </button>.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="register-modal__field">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                  required
                />
              </div>
              <div className="register-modal__field">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className="register-modal__field">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>

              <button type="submit" className="register-modal__submit">
                Create Account
              </button>
            </form>
          )}

          <p className="register-modal__login-link">
            Already have an account?{' '}
            <button type="button" className="register-modal__text-link" onClick={onSwitchToLogin}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
