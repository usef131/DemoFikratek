import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Spinner, Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '../../../Context/AuthContext'
import { authService } from '../../../Services/authService'
import { FiHome, FiCompass, FiGift, FiAward, FiUser, FiLogOut, FiArrowLeft } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

export default function EditProfile() {
  const { user, updateUser } = useAuth()
  const [form, setForm]         = useState({ name: user?.name || '', bio: user?.bio || '' })
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [saveError, setSaveError] = useState('')
  const navigate = useNavigate()

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true); setSaved(false); setSaveError('')
    try {
      const data = await authService.updateProfile(form)
      updateUser(data.user)
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        navigate('/profile') // go back to profile after saving
      }, 1500)
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      {/* ── Navbar ── */}
      <Navbar bg="white" className="shadow-sm py-1 border-bottom">
        <Container fluid className="px-5">
          <Navbar.Brand href="#" className="fw-bold fs-1 text-dark me-5">
            Fikretak
          </Navbar.Brand>

          <Nav className="mx-auto gap-4 align-items-center">
            <Nav.Link href="/Home-two" className="d-flex align-items-center gap-2 px-4 py-2 text-secondary rounded-pill">
              <FiHome size={20} /> Home
            </Nav.Link>
            <Nav.Link className="d-flex align-items-center gap-2 text-secondary" style={{ cursor: 'pointer' }} onClick={() => navigate('/marketplace')}>
              <FiCompass size={20} /> Marketplace
            </Nav.Link>
            <Nav.Link className="d-flex align-items-center gap-2 text-secondary" style={{ cursor: 'pointer' }} onClick={() => navigate('/collaborate')}>
              <FiGift size={20} /> Collaborate
            </Nav.Link>
            <Nav.Link className="d-flex align-items-center gap-2 text-secondary" style={{ cursor: 'pointer' }} onClick={() => navigate('/mentors')}>
              <FiAward size={20} /> Mentors
            </Nav.Link>
            <Nav.Link className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill bg-light text-primary fw-medium" style={{ cursor: 'pointer' }} onClick={() => navigate('/Profile')}>
              <FiUser size={20} /> Profile
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-4">
            <Link to="/Profile" style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--fk-primary-btn)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none',
            }}>
              {user?.name?.slice(0, 2).toUpperCase() || 'U'}
            </Link>
            <FiLogOut style={{ cursor: 'pointer' }} onClick={() => navigate('/login')} />
          </div>
        </Container>
      </Navbar>

      {/* ── Page Body ── */}
      <div style={{ background: 'var(--fk-bg)', minHeight: '100vh' }}>
        <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>

          {/* Back button */}
          <button
            onClick={() => navigate('/profile')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--fk-text-muted)', fontWeight: 600,
              fontSize: '0.875rem', marginBottom: '1.25rem', padding: 0,
            }}
          >
            <FiArrowLeft size={16} /> Back to Profile
          </button>

          <h2 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--fk-text-primary)' }}>
            Edit Profile
          </h2>

          <Row>
            <Col md={8}>
              {saved     && <Alert variant="success" style={{ fontSize: '0.875rem', borderRadius: 'var(--radius-sm)' }}>Profile updated! Redirecting…</Alert>}
              {saveError && <Alert variant="danger"  style={{ fontSize: '0.875rem', borderRadius: 'var(--radius-sm)' }}>{saveError}</Alert>}

              <div className="fk-card p-4">
                <Form onSubmit={handleSave}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Full Name</Form.Label>
                    <Form.Control
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Email</Form.Label>
                    <Form.Control
                      value={user?.email}
                      disabled
                      style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', background: 'var(--fk-bg)' }}
                    />
                    <Form.Text style={{ fontSize: '0.78rem', color: 'var(--fk-text-muted)' }}>
                      Email cannot be changed
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={form.bio}
                      onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                      placeholder="Tell investors a little about yourself…"
                      style={{ borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', resize: 'vertical' }}
                    />
                  </Form.Group>

                  <div className="d-flex gap-3">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="btn-primary"
                      style={{ borderRadius: 'var(--radius-pill)', fontWeight: 700, padding: '8px 24px' }}
                    >
                      {saving ? <Spinner size="sm" /> : 'Save Changes'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={() => navigate('/profile')}
                      style={{ borderRadius: 'var(--radius-pill)', fontWeight: 700, padding: '8px 24px' }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}