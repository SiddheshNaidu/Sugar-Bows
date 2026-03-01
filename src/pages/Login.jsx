import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import BrandLogo from '@/components/icons/BrandLogo'
import { IconGoogle } from '@/components/icons/Icons'
import { useAuth } from '@/hooks/useAuth'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const { signInWithEmail, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')

    const { error: authError } = await signInWithEmail(email)
    setLoading(false)

    if (authError) {
      setError(authError.message)
    } else {
      setSent(true)
    }
  }

  const handleGoogleLogin = async () => {
    await signInWithGoogle()
  }

  return (
    <PageWrapper>
      <section className="login-section">
        <div className="login-card">
          <div className="login-card__header">
            <BrandLogo size="lg" showText={false} />
            <h1 className="h2">Welcome to Sugar & Bows</h1>
            <p className="text-caption">
              Sign in to track orders, save occasions, and more.
            </p>
          </div>

          {sent ? (
            <div className="login-card__sent" style={{ animation: 'fadeInUp var(--duration-normal) var(--ease-out)' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'var(--color-primary-50)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto var(--space-4)',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 7l-10 7L2 7"/>
                </svg>
              </div>
              <h3 className="h4">Check your email</h3>
              <p className="text-body--sm" style={{ color: 'var(--color-medium-gray)', marginTop: 'var(--space-2)' }}>
                We've sent a magic link to <strong>{email}</strong>.<br />
                Click the link to sign in — no password needed.
              </p>
              <Button
                variant="ghost"
                onClick={() => { setSent(false); setEmail('') }}
                style={{ marginTop: 'var(--space-4)' }}
              >
                Use a different email
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                />
                <Button variant="primary" size="lg" fullWidth type="submit" loading={loading}>
                  Send Magic Link
                </Button>
              </form>

              <div className="login-divider">
                <span>or</span>
              </div>

              <Button
                variant="secondary"
                size="lg"
                fullWidth
                onClick={handleGoogleLogin}
                icon={<IconGoogle />}
              >
                Continue with Google
              </Button>
            </>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
