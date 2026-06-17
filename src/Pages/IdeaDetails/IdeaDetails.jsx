import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Alert, Spinner, Badge } from 'react-bootstrap'
import { ideaService } from '../../services/ideaService'
import { useAuth } from '../../context/AuthContext'

export default function IdeaDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [idea, setIdea]           = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')
  const [interested, setInterested] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    ideaService.getIdeaById(id)
      .then(data => {
        setIdea(data.idea)
        if (user) {
          setInterested(data.idea.interestedInvestors?.includes(user._id))
        }
      })
      .catch(() => setError('Idea not found or unavailable.'))
      .finally(() => setLoading(false))
  }, [id, user])

  const handleInterest = async () => {
    if (!user) return navigate('/login')
    if (user.role !== 'investor') return
    setActionLoading(true)
    try {
      if (interested) {
        await ideaService.withdrawInterest(id)
        setInterested(false)
        setIdea(prev => ({ ...prev, interestCount: prev.interestCount - 1 }))
      } else {
        await ideaService.expressInterest(id)
        setInterested(true)
        setIdea(prev => ({ ...prev, interestCount: prev.interestCount + 1 }))
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" style={{ color: 'var(--fk-primary)' }} />
    </div>
  )

  if (error || !idea) return (
    <Container className="py-5">
      <Alert variant="danger">{error || 'Something went wrong.'}</Alert>
    </Container>
  )

  return (
    <section className="section">
      <Container>
        <Row className="g-5">
          {/* Main Content */}
          <Col lg={8}>
            <Button
              variant="link"
              className="p-0 mb-4"
              onClick={() => navigate(-1)}
              style={{ color: 'var(--fk-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              <i className="bi bi-arrow-left me-1" /> Back to Ideas
            </Button>

            <div className="fk-badge fk-badge-primary mb-3">{idea.category}</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.3 }}>
              {idea.title}
            </h1>

            <div className="d-flex align-items-center gap-3 my-4" style={{ color: 'var(--fk-text-secondary)', fontSize: '0.875rem' }}>
              <span><i className="bi bi-eye me-1" />{idea.views || 0} views</span>
              <span><i className="bi bi-heart me-1" />{idea.interestCount || 0} interested</span>
              <span><i className="bi bi-calendar me-1" />
                {new Date(idea.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div
              className="p-4 rounded-fk mb-4"
              style={{ background: 'var(--fk-surface)', border: '1px solid var(--fk-border)' }}
            >
              <h5 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}>
                <i className="bi bi-file-text me-2" style={{ color: 'var(--fk-primary)' }} />
                Summary
              </h5>
              <p style={{ color: 'var(--fk-text-secondary)', lineHeight: 1.8, margin: 0 }}>{idea.summary}</p>
            </div>

            {idea.description && (
              <div
                className="p-4 rounded-fk mb-4"
                style={{ background: 'var(--fk-surface)', border: '1px solid var(--fk-border)' }}
              >
                <h5 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}>
                  <i className="bi bi-journal-text me-2" style={{ color: 'var(--fk-primary)' }} />
                  Full Description
                </h5>
                <div style={{ color: 'var(--fk-text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                  {idea.description}
                </div>
              </div>
            )}

            {idea.targetMarket && (
              <div className="p-4 rounded-fk mb-4" style={{ background: 'var(--fk-surface)', border: '1px solid var(--fk-border)' }}>
                <h5 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.75rem' }}>
                  <i className="bi bi-bullseye me-2" style={{ color: 'var(--fk-primary)' }} />
                  Target Market
                </h5>
                <p style={{ color: 'var(--fk-text-secondary)', lineHeight: 1.8, margin: 0 }}>{idea.targetMarket}</p>
              </div>
            )}
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Entrepreneur Card */}
            <div
              className="p-4 rounded-fk mb-4"
              style={{ background: 'var(--fk-surface)', border: '1px solid var(--fk-border)' }}
            >
              <h6 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Idea Creator</h6>
              <div className="d-flex align-items-center gap-3">
                <div style={{
                  width: 52, height: 52,
                  borderRadius: '50%',
                  background: 'var(--fk-primary)',
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                }}>
                  {idea.entrepreneur?.name?.[0] || '?'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                    {idea.entrepreneur?.name || 'Anonymous'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--fk-text-muted)' }}>Entrepreneur</div>
                </div>
              </div>
            </div>

            {/* Funding Goal */}
            {idea.fundingGoal && (
              <div
                className="p-4 rounded-fk mb-4"
                style={{ background: 'var(--fk-accent-soft)', border: '1px solid #F0E0A0' }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#B77A00', marginBottom: '0.5rem' }}>
                  FUNDING GOAL
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--fk-text-primary)' }}>
                  ${Number(idea.fundingGoal).toLocaleString()}
                </div>
              </div>
            )}

            {/* Interest Button (Investor only) */}
            {user?.role === 'investor' && (
              <Button
                onClick={handleInterest}
                disabled={actionLoading}
                variant={interested ? 'outline-danger' : 'primary'}
                className="w-100 mb-3"
                size="lg"
                style={{ borderRadius: 'var(--radius-pill)', fontWeight: 700, fontFamily: 'var(--font-display)' }}
              >
                {actionLoading ? <Spinner size="sm" /> : (
                  interested
                    ? <><i className="bi bi-heart-fill me-2" />Remove Interest</>
                    : <><i className="bi bi-heart me-2" />Express Interest</>
                )}
              </Button>
            )}

            {!user && (
              <Button
                href="/login"
                className="w-100 mb-3"
                size="lg"
                style={{ borderRadius: 'var(--radius-pill)', fontWeight: 700, background: 'var(--fk-primary)', border: 'none' }}
              >
                Sign in to show interest
              </Button>
            )}

            {/* Status */}
            <div
              className="p-3 rounded-fk text-center"
              style={{ background: 'var(--fk-bg)', border: '1px solid var(--fk-border)', fontSize: '0.85rem', color: 'var(--fk-text-secondary)' }}
            >
              Status:{' '}
              <strong style={{ color: idea.status === 'approved' ? 'var(--fk-success)' : 'var(--fk-text-muted)', textTransform: 'capitalize' }}>
                {idea.status}
              </strong>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
