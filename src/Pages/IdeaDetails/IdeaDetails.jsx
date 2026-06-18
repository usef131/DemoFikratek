import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap'
import { ideaService } from '../../../Services/ideaService'
import { useAuth } from '../../../Context/AuthContext'

export default function IdeaDetails() {
  const { id }     = useParams()
  const { user }   = useAuth()
  const navigate   = useNavigate()

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
        if (user) setInterested(data.idea.interestedInvestors?.includes(user._id))
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
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <Spinner animation="border" style={{ color: 'var(--fk-primary-btn)', width: 40, height: 40 }} />
    </div>
  )

  if (error || !idea) return (
    <Container className="py-5">
      <Alert variant="danger" style={{ borderRadius: 'var(--radius-sm)' }}>{error || 'Something went wrong.'}</Alert>
    </Container>
  )

  const fundingPct = idea.fundingGoal && idea.fundingRaised
    ? Math.min(100, Math.round((idea.fundingRaised / idea.fundingGoal) * 100))
    : idea.fundingProgress || 0

  return (
    <div style={{ background: 'var(--fk-bg)', minHeight: '100vh' }}>
      <Container style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            color: 'var(--fk-text-secondary)', fontSize: '0.875rem',
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem',
          }}
        >
          <i className="bi bi-arrow-left" /> Back to Marketplace
        </button>

        <Row className="g-4">
          {/* ── Main ── */}
          <Col lg={8}>
            <div className="fk-card p-4">
              {/* Status + Category */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <span style={{
                  padding: '3px 10px', borderRadius: 'var(--radius-pill)',
                  background: '#eef0ff', color: 'var(--fk-primary-btn)',
                  fontSize: '0.72rem', fontWeight: 600,
                }}>
                  {idea.category}
                </span>
                {idea.status && (
                  <span style={{
                    padding: '3px 10px', borderRadius: 'var(--radius-pill)',
                    background: '#d1fae5', color: '#065f46',
                    fontSize: '0.72rem', fontWeight: 600, textTransform: 'capitalize',
                  }}>
                    {idea.status}
                  </span>
                )}
              </div>

              <h1 style={{ fontWeight: 800, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', lineHeight: 1.3, marginBottom: '1rem' }}>
                {idea.title}
              </h1>

              {/* Meta row */}
              <div className="d-flex flex-wrap gap-4 mb-4" style={{ fontSize: '0.82rem', color: 'var(--fk-text-secondary)' }}>
                <span><i className="bi bi-eye me-1" />{idea.views || 0} views</span>
                <span><i className="bi bi-heart me-1" />{idea.interestCount || 0} interested</span>
                <span><i className="bi bi-calendar3 me-1" />
                  {new Date(idea.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              {/* Summary */}
              <section style={{ background: 'var(--fk-bg)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', marginBottom: '1rem' }}>
                <h5 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="bi bi-file-text" style={{ color: 'var(--fk-primary-btn)' }} />Summary
                </h5>
                <p style={{ color: 'var(--fk-text-secondary)', lineHeight: 1.75, margin: 0, fontSize: '0.9rem' }}>
                  {idea.summary}
                </p>
              </section>

              {idea.description && (
                <section style={{ background: 'var(--fk-bg)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', marginBottom: '1rem' }}>
                  <h5 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="bi bi-journal-text" style={{ color: 'var(--fk-primary-btn)' }} />Full Description
                  </h5>
                  <div style={{ color: 'var(--fk-text-secondary)', lineHeight: 1.75, fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                    {idea.description}
                  </div>
                </section>
              )}

              {idea.targetMarket && (
                <section style={{ background: 'var(--fk-bg)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
                  <h5 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="bi bi-bullseye" style={{ color: 'var(--fk-primary-btn)' }} />Target Market
                  </h5>
                  <p style={{ color: 'var(--fk-text-secondary)', lineHeight: 1.75, margin: 0, fontSize: '0.9rem' }}>
                    {idea.targetMarket}
                  </p>
                </section>
              )}
            </div>
          </Col>

          {/* ── Sidebar ── */}
          <Col lg={4}>
            {/* Founder Card */}
            <div className="fk-card p-4 mb-3">
              <h6 style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--fk-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                Idea Creator
              </h6>
              <div className="d-flex align-items-center gap-3">
                <div className="fk-avatar" style={{ width: 48, height: 48, fontSize: '1rem' }}>
                  {idea.entrepreneur?.name?.[0] || '?'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    {idea.entrepreneur?.name || 'Anonymous'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--fk-text-muted)' }}>Entrepreneur</div>
                </div>
              </div>
            </div>

            {/* Funding Goal */}
            {idea.fundingGoal && (
              <div className="fk-card p-4 mb-3">
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--fk-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  Funding Goal
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--fk-text-primary)', lineHeight: 1, marginBottom: '1rem' }}>
                  ${Number(idea.fundingGoal).toLocaleString()}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span style={{ fontSize: '0.78rem', color: 'var(--fk-text-muted)' }}>Funding Progress</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--fk-primary-btn)' }}>{fundingPct}%</span>
                </div>
                <div className="fk-progress">
                  <div className="fk-progress-fill" style={{ width: `${fundingPct}%` }} />
                </div>
              </div>
            )}

            {/* Invest / Interest Button */}
            {user?.role === 'investor' && (
              <Button
                onClick={handleInterest}
                disabled={actionLoading}
                className={interested ? '' : 'btn-primary'}
                variant={interested ? 'outline-danger' : undefined}
                size="lg"
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                  fontSize: '0.95rem',
                }}
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
                size="lg"
                className="btn-primary w-100"
                style={{ borderRadius: 'var(--radius-pill)', fontWeight: 700, marginBottom: '0.75rem' }}
              >
                Sign in to invest
              </Button>
            )}

            {/* Status chip */}
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--fk-bg)',
              border: '1px solid var(--fk-border)',
              textAlign: 'center',
              fontSize: '0.82rem',
              color: 'var(--fk-text-secondary)',
            }}>
              Status:{' '}
              <strong style={{
                color: idea.status === 'approved' ? 'var(--fk-success)' : 'var(--fk-text-muted)',
                textTransform: 'capitalize',
              }}>
                {idea.status}
              </strong>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
