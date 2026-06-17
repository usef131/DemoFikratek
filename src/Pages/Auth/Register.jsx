import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: '', // 'entrepreneur' | 'investor'
  })
  const [errors,   setErrors]   = useState({})
  const [apiError, setApiError] = useState('')
  const [loading,  setLoading]  = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Full name is required'
    if (!form.email)          e.email   = 'Email is required'
    if (!form.password)       e.password = 'Password is required'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!form.role)           e.role    = 'Please select your role'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true); setApiError('')
    try {
      const user = await register({ name: form.name, email: form.email, password: form.password, role: form.role })
      navigate(user.role === 'entrepreneur' ? '/create-idea' : '/ideas')
    } catch (e) {
      setApiError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const f = (field) => ({
    value: form[field],
    onChange: e => {
      setForm(p => ({ ...p, [field]: e.target.value }))
      if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
    },
    isInvalid: !!errors[field],
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fk-bg)', display: 'flex', alignItems: 'center', padding: '3rem 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={10} md={8} lg={6}>
            <div className="text-center mb-4">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span style={{
                  background: 'var(--fk-primary)',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '6px 16px',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  fontFamily: 'var(--font-display)',
                }}>
                  فكرتك · Fikretak
                </span>
              </Link>
            </div>

            <div className="fk-card p-4 p-md-5">
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '0.25rem' }}>
                Create your account
              </h2>
              <p style={{ color: 'var(--fk-text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                Join Fikretak and start your journey
              </p>

              {apiError && <Alert variant="danger" dismissible onClose={() => setApiError('')}>{apiError}</Alert>}

              <Form onSubmit={handleSubmit} noValidate>
                {/* Role Selection */}
                <div className="mb-4">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: '0.75rem' }}>
                    I am a… <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="d-flex gap-3">
                    {[
                      { value: 'entrepreneur', icon: 'bi-lightbulb', label: 'Entrepreneur', sub: 'I have an idea' },
                      { value: 'investor',     icon: 'bi-cash-coin', label: 'Investor',     sub: 'I want to fund ideas' },
                    ].map(opt => (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => { setForm(p => ({ ...p, role: opt.value })); if (errors.role) setErrors(p => ({ ...p, role: '' })) }}
                        style={{
                          flex: 1,
                          padding: '1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '2px solid',
                          borderColor: form.role === opt.value ? 'var(--fk-primary)' : 'var(--fk-border)',
                          background: form.role === opt.value ? '#EEF0FF' : 'var(--fk-surface)',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          textAlign: 'center',
                        }}
                      >
                        <i className={`bi ${opt.icon}`} style={{ fontSize: '1.5rem', color: form.role === opt.value ? 'var(--fk-primary)' : 'var(--fk-text-muted)', display: 'block', marginBottom: '0.5rem' }} />
                        <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: form.role === opt.value ? 'var(--fk-primary)' : 'var(--fk-text-primary)' }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--fk-text-muted)' }}>{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                  {errors.role && <div style={{ color: 'var(--fk-danger)', fontSize: '0.875em', marginTop: '0.25rem' }}>{errors.role}</div>}
                </div>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Full Name</Form.Label>
                  <Form.Control {...f('name')} placeholder="Your full name" style={{ borderRadius: 'var(--radius-sm)', padding: '0.65rem 1rem' }} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email</Form.Label>
                  <Form.Control {...f('email')} type="email" placeholder="you@example.com" style={{ borderRadius: 'var(--radius-sm)', padding: '0.65rem 1rem' }} />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Password</Form.Label>
                  <Form.Control {...f('password')} type="password" placeholder="Min. 6 characters" style={{ borderRadius: 'var(--radius-sm)', padding: '0.65rem 1rem' }} />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Confirm Password</Form.Label>
                  <Form.Control {...f('confirmPassword')} type="password" placeholder="Repeat your password" style={{ borderRadius: 'var(--radius-sm)', padding: '0.65rem 1rem' }} />
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  size="lg"
                  disabled={loading}
                  style={{
                    background: 'var(--fk-primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {loading ? <Spinner size="sm" /> : 'Create Account'}
                </Button>
              </Form>

              <p className="text-center mt-4 mb-0" style={{ fontSize: '0.9rem', color: 'var(--fk-text-secondary)' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--fk-primary)', fontWeight: 600 }}>Sign in</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
