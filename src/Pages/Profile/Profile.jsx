import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert, Spinner, Tab, Tabs } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'
import { ideaService } from '../../services/ideaService'
import IdeaCard from '../../components/cards/IdeaCard'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [form, setForm]         = useState({ name: user?.name || '', bio: user?.bio || '' })
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [saveError, setSaveError] = useState('')
  const [myIdeas, setMyIdeas]   = useState([])
  const [ideasLoading, setIdeasLoading] = useState(false)

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

  return (
    <section className="section">
      <Container>
        {/* Header */}
        <div className="d-flex align-items-center gap-4 mb-5">
          <div style={{
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'var(--fk-primary)',
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
          }}>
            {user?.name?.[0]}
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, margin: 0 }}>{user?.name}</h1>
            <span className={`fk-badge ${user?.role === 'investor' ? 'fk-badge-accent' : 'fk-badge-primary'} mt-1`}
              style={{ textTransform: 'capitalize' }}>
              {user?.role}
            </span>
          </div>
        </div>

        <Tabs defaultActiveKey="profile" className="mb-4">
          {/* Profile Settings */}
          <Tab eventKey="profile" title="Profile Settings">
            <Row className="justify-content-start mt-4">
              <Col md={6}>
                {saved    && <Alert variant="success">Profile updated successfully!</Alert>}
                {saveError && <Alert variant="danger">{saveError}</Alert>}

                <Form onSubmit={handleSave}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>Full Name</Form.Label>
                    <Form.Control
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      style={{ borderRadius: 'var(--radius-sm)' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 600 }}>Email</Form.Label>
                    <Form.Control value={user?.email} disabled style={{ borderRadius: 'var(--radius-sm)' }} />
                    <Form.Text>Email cannot be changed</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: 600 }}>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={form.bio}
                      onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                      placeholder="Tell investors a little about yourself…"
                      style={{ borderRadius: 'var(--radius-sm)', resize: 'vertical' }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={saving}
                    style={{
                      background: 'var(--fk-primary)',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 700,
                    }}
                  >
                    {saving ? <Spinner size="sm" /> : 'Save Changes'}
                  </Button>
                </Form>
              </Col>
            </Row>
          </Tab>

          {/* My Ideas (Entrepreneur) */}
          {user?.role === 'entrepreneur' && (
            <Tab eventKey="ideas" title={`My Ideas (${myIdeas.length})`}>
              <div className="mt-4">
                {ideasLoading ? (
                  <Spinner animation="border" style={{ color: 'var(--fk-primary)' }} />
                ) : myIdeas.length > 0 ? (
                  <Row className="g-4">
                    {myIdeas.map(idea => (
                      <Col key={idea._id} md={6} lg={4}>
                        <IdeaCard idea={idea} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-lightbulb" style={{ fontSize: '3rem', color: 'var(--fk-border)' }} />
                    <p className="mt-3" style={{ color: 'var(--fk-text-muted)' }}>
                      You haven't submitted any ideas yet.
                    </p>
                  </div>
                )}
              </div>
            </Tab>
          )}
        </Tabs>
      </Container>
    </section>
  )
}
