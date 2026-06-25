import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../../../Context/AuthContext'
import { authService } from '../../../Services/authService'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import SecondNavbar from '../../Components/Common/SecondNavbar'

const SECTOR_OPTIONS = ['Fintech', 'EdTech', 'AgriTech', 'HealthTech', 'CleanEnergy', 'E-commerce', 'Logistics', 'SaaS']
const STAGE_OPTIONS  = ['idea', 'mvp', 'growth', 'scaling']

export default function EditProfile() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name:       user?.name       || '',
    bio:        user?.bio        || '',
    location:   user?.location   || '',
    linkedin:   user?.linkedin   || '',
    // investor-only
    sectors:    user?.sectors    || [],
    ticketSize: user?.ticketSize || '',
    experience: user?.experience || '',
    // entrepreneur-only
    startup:    user?.startup    || '',
    stage:      user?.stage      || '',
    website:    user?.website    || '',
  })

  const [saving,    setSaving]    = useState(false)
  const [saved,     setSaved]     = useState(false)
  const [saveError, setSaveError] = useState('')

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }))

  const toggleSector = (s) => {
    set('sectors', form.sectors.includes(s)
      ? form.sectors.filter(x => x !== s)
      : [...form.sectors, s]
    )
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true); setSaved(false); setSaveError('')
    try {
      const data = await authService.updateProfile(form)
      updateUser(data.user)
      setSaved(true)
      setTimeout(() => { setSaved(false); navigate('/profile') }, 1500)
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const labelStyle = { fontWeight: 600, fontSize: '0.875rem' }
  const inputStyle = { borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }

  return (
    <>
      <SecondNavbar />

      <div style={{ background: 'var(--fk-bg)', minHeight: '100vh' }}>
        <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>

          {/* Back */}
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
            <Col md={10}>
              {saved     && <Alert variant="success" style={{ fontSize: '0.875rem' }}>Profile updated! Redirecting…</Alert>}
              {saveError && <Alert variant="danger"  style={{ fontSize: '0.875rem' }}>{saveError}</Alert>}

              <div className="fk-card p-4">
                <Form onSubmit={handleSave}>

                  {/* ── Shared fields ── */}
                  <p style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--fk-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                    Basic Info
                  </p>

                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Full Name</Form.Label>
                    <Form.Control
                      value={form.name || ''}
                      onChange={e => set('name', e.target.value)}
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Email</Form.Label>
                    <Form.Control
                      value={user?.email || ''}
                      disabled
                      style={{ ...inputStyle, background: 'var(--fk-bg)' }}
                    />
                    <Form.Text style={{ fontSize: '0.78rem', color: 'var(--fk-text-muted)', marginLeft: '0.5rem' }}>
                         Email cannot be changed
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={form.bio || ''}
                      onChange={e => set('bio', e.target.value)}
                      placeholder="Tell others a little about yourself…"
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label style={labelStyle}>Location</Form.Label>
                        <Form.Control
                          value={form.location || ''}
                          onChange={e => set('location', e.target.value)}
                          placeholder="Cairo, Egypt"
                          style={inputStyle}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label style={labelStyle}>LinkedIn URL</Form.Label>
                        <Form.Control
                          value={form.linkedin || ''}
                          onChange={e => set('linkedin', e.target.value)}
                          placeholder="https://linkedin.com/in/yourname"
                          style={inputStyle}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr style={{ borderColor: 'var(--fk-border)', margin: '1.5rem 0' }} />

                  {/* ── Investor-only fields ── */}
                  {user?.role === 'investor' && (
                    <>
                      <p style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--fk-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                        Investor Info
                      </p>

                      <Form.Group className="mb-3">
                        <Form.Label style={labelStyle}>Investment Sectors</Form.Label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
                          {SECTOR_OPTIONS.map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => toggleSector(s)}
                              style={{
                                padding: '5px 14px',
                                borderRadius: 'var(--radius-pill)',
                                border: '1.5px solid',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                ...(form.sectors.includes(s)
                                  ? { background: '#EEEDFE', borderColor: '#AFA9EC', color: '#3C3489' }
                                  : { background: 'var(--fk-surface)', borderColor: 'var(--fk-border)', color: 'var(--fk-text-muted)' }
                                )
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        <Form.Text style={{ fontSize: '0.78rem', color: 'var(--fk-text-muted)' }}>
                          Select all that apply
                        </Form.Text>
                      </Form.Group>

                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label style={labelStyle}>Ticket Size</Form.Label>
                            <Form.Control
                              value={form.ticketSize || ''}
                              onChange={e => set('ticketSize', e.target.value)}
                              placeholder="e.g. $50K – $200K"
                              style={inputStyle}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label style={labelStyle}>Experience</Form.Label>
                            <Form.Control
                              value={form.experience || ''}
                              onChange={e => set('experience', e.target.value)}
                              placeholder="e.g. 10+ years in VC"
                              style={inputStyle}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </>
                  )}

                  {/* ── Entrepreneur-only fields ── */}
                  {user?.role === 'entrepreneur' && (
                    <>
                      <p style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--fk-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                        Startup Info
                      </p>

                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label style={labelStyle}>Startup Name</Form.Label>
                            <Form.Control
                              value={form.startup || ''}
                              onChange={e => set('startup', e.target.value)}
                              placeholder="Your startup name"
                              style={inputStyle}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label style={labelStyle}>Stage</Form.Label>
                            <Form.Select
                              value={form.stage}
                              onChange={e => set('stage', e.target.value)}
                              style={inputStyle}
                            >
                              <option value="">Select stage…</option>
                              {STAGE_OPTIONS.map(s => (
                                <option key={s} value={s} style={{ textTransform: 'capitalize' }}>{s}</option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label style={labelStyle}>Website</Form.Label>
                        <Form.Control
                          value={form.website}
                          onChange={e => set('website', e.target.value)}
                          placeholder="https://yourstartup.com"
                          style={inputStyle}
                        />
                      </Form.Group>
                    </>
                  )}

                  {/* ── Actions ── */}
                  <div className="d-flex gap-3 mt-4">
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
                      variant="secondary"
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