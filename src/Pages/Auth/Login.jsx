import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../../../Context/AuthContext'

export default function Login() {
  const { login }  = useAuth()
  const navigate   = useNavigate()
  const location   = useLocation()
  const from       = location.state?.from?.pathname || '/'

  const [form, setForm]       = useState({ email: '', password: '' })
  const [errors, setErrors]   = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email)    e.email    = 'Email is required'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true); setApiError('')
    try {
      await login(form.email, form.password)
      navigate("/home-two" , { replace: true })
    } catch (e) {
      setApiError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--fk-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Brand */}
        <div className="text-center mb-5">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)', letterSpacing: '-0.5px' }}>
              Fikretak
            </span>
          </Link>
          <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
            Welcome back!
          </h2>
          <p style={{ color: 'var(--fk-text-secondary)', fontSize: '0.875rem' }}>
            Sign in to continue sharing ideas
          </p>
        </div>

        <div className="fk-card p-4">
          {apiError && (
            <Alert variant="danger" dismissible onClose={() => setApiError('')} style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
              {apiError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem' }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                isInvalid={!!errors.email}
                style={{ borderRadius: 'var(--radius-sm)', padding: '0.65rem 1rem', fontSize: '0.9rem' }}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.4rem' }}>Password</Form.Label>
              <Form.Control
                type="password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                isInvalid={!!errors.password}
                style={{ borderRadius: 'var(--radius-sm)', padding: '0.65rem 1rem', fontSize: '0.9rem' }}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <div className="text-end mb-4">
              <Link to="/forgot-password" style={{ fontSize: '0.82rem', color: 'var(--fk-primary-btn)', textDecoration: 'none', fontWeight: 500 }}>
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-100 btn-primary"
              size="lg"
              disabled={loading}
              style={{ borderRadius: 'var(--radius-pill)', fontWeight: 700, fontSize: '0.95rem', padding: '0.7rem' }}
            >
              {loading ? <Spinner size="sm" /> : 'Sign In'}
            </Button>
          </Form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '1.25rem 0' }}>
            <hr style={{ flex: 1, margin: 0, borderColor: 'var(--fk-border)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--fk-text-muted)', whiteSpace: 'nowrap' }}>Or continue with</span>
            <hr style={{ flex: 1, margin: 0, borderColor: 'var(--fk-border)' }} />
          </div>

          {/* Social buttons */}
          {[
            { icon: 'bi-google', label: 'Continue with Google',  color: '#4285F4'},
            { icon: 'bi-linkedin', label: 'Continue with LinkedIn', color: '#0a66c2' },
            { icon: 'bi-facebook', label: 'Continue with Facebook', color: '#1877f2' },
          ].map(s => (
            <button
              key={s.label}
              type="button"
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                border: '1.5px solid var(--fk-border)',
                borderRadius: 'var(--radius-pill)',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '0.6rem',
                color: 'var(--fk-text-primary)',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = s.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--fk-border)'}
            >
              <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: '1rem' }} />
              {s.label}
            </button>
          ))}
        </div>

        <p className="text-center mt-4" style={{ fontSize: '0.875rem', color: 'var(--fk-text-secondary)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--fk-primary-btn)', fontWeight: 600, textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
