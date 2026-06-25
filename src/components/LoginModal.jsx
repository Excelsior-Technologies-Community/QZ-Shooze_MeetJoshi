import { useState, useEffect } from 'react'
import './LoginModal.css'

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [showRecover, setShowRecover] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [recoverEmail, setRecoverEmail] = useState('')
  const [recoverSent, setRecoverSent] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowRecover(false)
      setEmail('')
      setPassword('')
      setRecoverEmail('')
      setRecoverSent(false)
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

  const handleLogin = (e) => {
    e.preventDefault()
  }

  const handleRecover = (e) => {
    e.preventDefault()
    setRecoverSent(true)
  }

  return (
    <div className="login-modal" role="dialog" aria-modal="true" aria-label="Login">
      <div className="login-modal__overlay" onClick={onClose} />
      <div className="login-modal__content">
        <button type="button" className="login-modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 14 14" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 13L1 1M13 1L1 13" />
          </svg>
        </button>

        {!showRecover ? (
          <div className="login-modal__form-wrap">
            <h3 className="login-modal__title">Login</h3>
            <p className="login-modal__subtitle">Please enter your e-mail and password:</p>

            <form onSubmit={handleLogin}>
              <div className="login-modal__field">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
              </div>
              <div className="login-modal__field">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <p className="login-modal__forgot">
                <button type="button" className="login-modal__text-link" onClick={() => setShowRecover(true)}>
                  Forgot your password?
                </button>
              </p>

              <button type="submit" className="login-modal__submit">
                Login
              </button>
            </form>

            <p className="login-modal__register">
              New customer?{' '}
              <button type="button" className="login-modal__text-link" onClick={onSwitchToRegister}>
                Register
              </button>
            </p>
          </div>
        ) : (
          <div className="login-modal__form-wrap">
            <h3 className="login-modal__title">Reset your password</h3>
            <p className="login-modal__subtitle">We will send you an email to reset your password.</p>

            {recoverSent ? (
              <div className="login-modal__success">
                We&apos;ve sent you an email with a link to update your password.
              </div>
            ) : (
              <form onSubmit={handleRecover}>
                <div className="login-modal__field">
                  <input
                    type="email"
                    placeholder="Email"
                    value={recoverEmail}
                    onChange={(e) => setRecoverEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                <button type="submit" className="login-modal__submit">
                  Submit
                </button>
              </form>
            )}

            <button type="button" className="login-modal__text-link login-modal__back" onClick={() => setShowRecover(false)}>
              Back to login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
