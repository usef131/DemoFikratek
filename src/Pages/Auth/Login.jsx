import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from?.pathname || '/'

  const [form, setForm]     = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading]   = useState(false)

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
      navigate(from, { replace: true })
    } catch (e) {
      setApiError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fk-bg)', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={10} md={7} lg={5}>
            {/* Logo */}
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
                Welcome back
              </h2>
              <p style={{ color: 'var(--fk-text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                Sign in to your Fikretak account
              </p>

              {apiError && <Alert variant="danger" dismissible onClose={() => setApiError('')}>{apiError}</Alert>}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    isInvalid={!!errors.email}
                    style={{ borderRadius: 'var(--radius-sm)', padding: '0.65rem 1rem' }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="Enter your password"
                    isInvalid={!!errors.password}
                    style={{ borderRadius: 'var(--radius-sm)', padding: '0.65rem 1rem' }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
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
                  {loading ? <Spinner size="sm" /> : 'Sign In'}
                </Button>
              </Form>

              <p className="text-center mt-4 mb-0" style={{ fontSize: '0.9rem', color: 'var(--fk-text-secondary)' }}>
                Don't have an account?{' '}
                <Link to="/register" style={{ color: 'var(--fk-primary)', fontWeight: 600 }}>
                  Create one
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
