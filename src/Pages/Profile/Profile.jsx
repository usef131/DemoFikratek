import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert, Spinner, Tab, Tabs , Navbar , Nav} from 'react-bootstrap'
import { useAuth } from '../../../Context/AuthContext'
import { authService } from '../../../Services/authService'
import { ideaService } from '../../../Services/ideaService'
import IdeaCard from '../../Components/cards/IdeaCard'
import { FiHome, FiCompass, FiGift, FiAward, FiUser, FiLogOut } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import SecondNavbar from '../../Components/Common/SecondNavbar'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [form, setForm]     = useState({ name: user?.name || '', bio: user?.bio || '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)
  const [saveError, setSaveError] = useState('')
  const [myIdeas, setMyIdeas]     = useState([])
  const [ideasLoading, setIdeasLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'entrepreneur') {
      setIdeasLoading(true)
      ideaService.getMyIdeas()
        .then(d => setMyIdeas(d.ideas || []))
        .catch(() => {})
        .finally(() => setIdeasLoading(false))
    }
  }, [user])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true); setSaved(false); setSaveError('')
    try {
      const data = await authService.updateProfile(form)
      updateUser(data.user)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <>
     {/* ── Navbar ── */}
     <SecondNavbar/>


    <div style={{ background: 'var(--fk-bg)', minHeight: '100vh' }}>
      <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        {/* ── Profile Card ── */}
        <div className="fk-card p-4 mb-4" style={{ position: 'relative' }}>
          {/* Cover strip */}
          <div style={{
            height: 80,
            
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
            margin: '-1rem -1rem 0',
          }} />

          <div style={{ marginTop: '-40px', paddingTop: 0, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
            <div className="fk-avatar" style={{
              width: 80, height: 80, fontSize: '1.5rem',
              border: '4px solid var(--fk-surface)',
            }}>
              {initials}
            </div>
            <div style={{ paddingBottom: 4 }}>
              <h1 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.15rem', color: 'var(--fk-text-primary)' }}>
                {user?.name}
              </h1>
              <span style={{
                display: 'inline-block',
                padding: '2px 10px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.72rem',
                fontWeight: 600,
                background: user?.role === 'investor' ? '#fef3c7' : '#eef0ff',
                color: user?.role === 'investor' ? '#92400e' : 'var(--fk-primary-btn)',
                textTransform: 'capitalize',
              }}>
                {user?.role}
              </span>
            </div>

            <button
              style={{
                marginLeft: 'auto',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid var(--fk-border)',
                background: 'var(--fk-surface)',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <i className="bi bi-gear" />Edit Profile
            </button>
          </div>

          {/* Stats row */}
          <div className="d-flex gap-4 mt-4" style={{ fontSize: '0.875rem' }}>
            <div className="text-center">
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>
                {myIdeas.length || 0}
              </div>
              <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>Posts</div>
            </div>
            <div className="text-center">
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>0</div>
              <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>Followers</div>
            </div>
            <div className="text-center">
              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--fk-text-primary)' }}>0</div>
              <div style={{ color: 'var(--fk-text-muted)', fontSize: '0.78rem' }}>Likes</div>
            </div>
          </div>
        </div>

        <Tabs defaultActiveKey="settings" className="mb-4" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
          {/* ── Settings Tab ── */}
          <Tab eventKey="settings" title="Profile Settings">
            <Row className="mt-3">
              <Col md={6}>
                {saved     && <Alert variant="success" style={{ fontSize: '0.875rem', borderRadius: 'var(--radius-sm)' }}>Profile updated!</Alert>}
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
                    <Button
                      type="submit"
                      disabled={saving}
                      className="btn-primary"
                      style={{ borderRadius: 'var(--radius-pill)', fontWeight: 700, padding: '8px 24px' }}
                    >
                      {saving ? <Spinner size="sm" /> : 'Save Changes'}
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Tab>

          {/* ── My Ideas (Entrepreneur) ── */}
          {user?.role === 'entrepreneur' && (
            <Tab eventKey="ideas" title={`My Ideas (${myIdeas.length})`}>
              <div className="mt-3">
                {ideasLoading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" style={{ color: 'var(--fk-primary-btn)' }} />
                  </div>
                ) : myIdeas.length > 0 ? (
                  <Row className="g-3">
                    {myIdeas.map(idea => (
                      <Col key={idea._id} md={6} lg={4}>
                        <IdeaCard idea={idea} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-lightbulb" style={{ fontSize: '2.5rem', color: 'var(--fk-border)' }} />
                    <p className="mt-3" style={{ color: 'var(--fk-text-muted)', fontSize: '0.875rem' }}>
                      You haven't submitted any ideas yet.
                    </p>
                  </div>
                )}
              </div>
            </Tab>
          )}
        </Tabs>
      </Container>
    </div>
  </>
  )
}
