import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap'
import { ideaService } from '../../../Services/ideaService'
import { useAuth } from '../../../Context/AuthContext'

export default function IdeaDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [idea, setIdea] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [interested, setInterested] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    ideaService.getIdeaById(id)
      .then(data => {
        setIdea(data.idea)
        if (user) setInterested(
          data.idea.interestedInvestors?.some(
            inv => (inv._id || inv).toString() === user._id.toString()
          )
        )
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
      <Spinner animation="border" style={{ color: '#3151b5', width: 40, height: 40 }} />
    </div>
  )

  if (error || !idea) return (
    <Container className="py-5">
      <Alert variant="danger">{error || 'Something went wrong.'}</Alert>
    </Container>
  )

  const fundingPct = idea.fundingGoal && idea.fundingRaised
    ? Math.min(100, Math.round((idea.fundingRaised / idea.fundingGoal) * 100))
    : idea.fundingProgress || 0

  return (
    <div style={{ background: '#f8f9fc', minHeight: '100vh' }}>
      <Container style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            color: '#667085', fontSize: '0.875rem',
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem',
          }}
        >
          ← Back to Projects
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="d-flex gap-2 mb-2">
            <span style={{
              background: '#eef0ff', padding: '5px 14px',
              borderRadius: '20px', color: '#3151b5', fontSize: '13px', fontWeight: 600,
            }}>
              {idea.category}
            </span>
            {idea.status && (
              <span style={{
                background: '#d1fae5', padding: '5px 14px',
                borderRadius: '20px', color: '#065f46', fontSize: '13px', fontWeight: 600,
              }}>
                {idea.status}
              </span>
            )}
          </div>

          <h1 style={{ fontWeight: 800, fontSize: '2rem', marginTop: '12px', marginBottom: '8px' }}>
            {idea.title}
          </h1>

          <div style={{ color: '#667085', fontSize: '0.875rem' }}>
            <i className="bi bi-eye me-1" />{idea.views || 0} views &nbsp;•&nbsp;
            <i className="bi bi-heart me-1" />{idea.interestCount || 0} interested &nbsp;•&nbsp;
            <i className="bi bi-calendar3 me-1" />
            {new Date(idea.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        <Row className="g-4">

          {/* LEFT */}
          <Col lg={8}>

            {/* Image */}
            <div style={{
              height: '330px', borderRadius: '15px',
              overflow: 'hidden', marginBottom: '20px',
            }}>
              <img
                src={idea.image || 'https://images.unsplash.com/photo-1497366754035-f200968a6e72'}
                alt={idea.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Mission */}
            <div className="fk-card p-4 mb-3">
              <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.75rem' }}>
                Project Mission
              </h3>
              <p style={{ color: '#667085', lineHeight: 1.8, margin: 0 }}>
                {idea.mission || idea.description || idea.summary}
              </p>
            </div>

            {/* Stats */}

            <div className="fk-card p-4 mb-3">
              <Row className="text-center">
                {[
                  { val: idea.impactScore || '8.4/10', label: 'Impact Score' },
                  { val: idea.marketSize || '$12B', label: 'Market Size' },
                  { val: idea.userGrowth || '+24%', label: 'User Growth' },
                  { val: idea.co2Saved || '1.2k t', label: 'CO2 Saved' },
                ].map((s, i) => (
                  <Col key={i}>
                    <h3 style={{ fontWeight: 800, color: '#1a3a6b' }}>{s.val}</h3>
                    <small style={{ color: '#667085', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '1px' }}>
                      {s.label}
                    </small>
                  </Col>
                ))}
              </Row>
            </div>



            {/* Target Market */}
            {idea.targetMarket && (
              <div className="fk-card p-4">
                <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.75rem' }}>
                  Target Market
                </h3>
                <p style={{ color: '#667085', lineHeight: 1.8, margin: 0 }}>
                  {idea.targetMarket}
                </p>
              </div>
            )}
          </Col>

          {/* RIGHT */}
          <Col lg={4}>

            {/* Funding Card */}
            {idea.fundingGoal && (
              <div className="fk-card p-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h4 style={{ fontWeight: 700, margin: 0 }}>Funding</h4>
                  <span style={{ fontWeight: 700, color: '#3151b5' }}>{fundingPct}%</span>
                </div>

                <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  ${Number(idea.fundingGoal).toLocaleString()}
                </div>

                <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem', color: '#667085' }}>
                  <span>Raised: ${Number(idea.fundingRaised || 0).toLocaleString()}</span>
                  <span>Goal: ${Number(idea.fundingGoal).toLocaleString()}</span>
                </div>

                <div style={{ background: '#e5e7eb', borderRadius: '999px', height: 8, overflow: 'hidden' }}>
                  <div style={{
                    width: `${fundingPct}%`, height: '100%',
                    background: '#3151b5', borderRadius: '999px',
                    transition: 'width 0.4s ease',
                  }} />
                </div>

                {user?.role === 'investor' && (
                  <Button
                    onClick={handleInterest}
                    disabled={actionLoading}
                    style={{
                      marginTop: '20px', width: '100%',
                      borderRadius: '8px', padding: '14px',
                      fontWeight: 700, background: '#1a3a6b', border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    }}
                  >
                    {actionLoading ? <Spinner size="sm" /> : interested ? (
                      <><i className="bi bi-heart-fill" />Remove Interest</>
                    ) : (
                      <><i className="bi bi-heart" />Express Interest</>
                    )}
                  </Button>
                )}

                {!user && (
                  <Button
                    href="/login"
                    style={{
                      marginTop: '20px', width: '100%',
                      borderRadius: '8px', padding: '14px',
                      fontWeight: 700, background: '#1a3a6b', border: 'none',
                    }}
                  >
                    Sign in to invest
                  </Button>
                )}
              </div>
            )}

            {/* Idea Creator */}
            <div className="fk-card p-4">
              <h6 style={{
                fontWeight: 700, fontSize: '0.75rem', color: '#667085',
                textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem',
              }}>
                Idea Creator
              </h6>
              <div className="d-flex align-items-center gap-3">
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: '#1a3a6b', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, color: '#fff', fontSize: '1rem',
                }}>
                  {idea.entrepreneur?.name?.[0] || '?'}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{idea.entrepreneur?.name || 'Anonymous'}</div>
                  <div style={{ fontSize: '0.78rem', color: '#667085' }}>Entrepreneur</div>
                </div>
              </div>
            </div>

          </Col>
        </Row>


        {/* Roadmap */}
<div className="fk-card p-5 mt-4">

  <h2 
    style={{ 
      textAlign: 'center', 
      fontWeight: 800, 
      marginBottom: '2.5rem' 
    }}
  >
    Project Roadmap
  </h2>


  <Row>

    {idea.roadmap.map((item, i) => (

      <Col key={i}>

        <div 
          style={{ 
            borderLeft: '3px solid #3151b5', 
            padding: '20px' 
          }}
        >

          <h6 
            style={{ 
              color: '#3151b5', 
              fontWeight: 700 
            }}
          >
            {item.period}
          </h6>


          <h5 
            style={{ 
              fontWeight: 700 
            }}
          >
            {item.title}
          </h5>


          <p 
            style={{ 
              color: '#667085', 
              fontSize: '0.875rem', 
              margin: 0 
            }}
          >
            {item.desc}
          </p>


        </div>

      </Col>

    ))}

  </Row>

</div>

      </Container>
    </div>
  )
}