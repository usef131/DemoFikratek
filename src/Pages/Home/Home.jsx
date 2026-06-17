import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useAuth } from '../../../Context/AuthContext'
import { ideaService } from '../../../Services/ideaService'
import IdeaCard from '../../Components/cards/IdeaCard'

const CATEGORIES = ['Tech', 'Health', 'Education', 'Finance', 'Environment', 'Social']

export default function Home() {
  const { user } = useAuth()
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    // ideaService.getIdeas({ limit: 6, status: 'approved' })
    //   .then(d => setFeatured(d.ideas || []))
    //   .catch(() => {})
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--fk-primary) 0%, #2a3a8c 100%)',
          color: '#fff',
          padding: '6rem 0 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', right: '-80px', top: '-80px',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: '10%', bottom: '-120px',
          width: 280, height: 280,
          borderRadius: '50%',
          background: 'rgba(236,171,17,0.15)',
          pointerEvents: 'none',
        }} />

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div
                className="fk-badge fk-badge-accent mb-4"
                style={{ fontSize: '0.8rem' }}
              >
                <i className="bi bi-stars" /> Youth &amp; Investors Platform
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: '#fff',
                  marginBottom: '1.5rem',
                }}
              >
                Your Idea Deserves{' '}
                <span style={{ color: 'var(--fk-accent)' }}>the Right Investor</span>
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.85, maxWidth: 480, lineHeight: 1.7 }}>
                Fikretak connects ambitious young entrepreneurs with investors who are ready to
                fund the next generation of impactful startups.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                {!user ? (
                  <>
                    <Button
                      as={Link} to="/register"
                      size="lg"
                      style={{
                        background: 'var(--fk-accent)',
                        border: 'none',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)',
                        padding: '0.75rem 2rem',
                      }}
                    >
                      Share Your Idea
                    </Button>
                    <Button
                      as={Link} to="/ideas"
                      size="lg"
                      variant="outline-light"
                      style={{ borderRadius: 'var(--radius-pill)', padding: '0.75rem 2rem' }}
                    >
                      Browse Ideas
                    </Button>
                  </>
                ) : (
                  <Button
                    as={Link} to={user.role === 'entrepreneur' ? '/create-idea' : '/ideas'}
                    size="lg"
                    style={{
                      background: 'var(--fk-accent)',
                      border: 'none',
                      borderRadius: 'var(--radius-pill)',
                      fontWeight: 700,
                    }}
                  >
                    {user.role === 'entrepreneur' ? 'Submit a New Idea' : 'Discover Ideas'}
                  </Button>
                )}
              </div>
            </Col>

            <Col lg={6}>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {[
                  { icon: 'bi-lightbulb-fill', label: 'Ideas Submitted', value: '120+', color: 'var(--fk-accent)' },
                  { icon: 'bi-people-fill',    label: 'Active Investors', value: '45+',  color: '#fff' },
                  { icon: 'bi-graph-up-arrow', label: 'Funded Projects', value: '18',    color: 'var(--fk-accent)' },
                  { icon: 'bi-globe',          label: 'Categories',      value: '6',     color: '#fff' },
                ].map(stat => (
                  <div
                    key={stat.label}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.5rem',
                      minWidth: 160,
                      textAlign: 'center',
                    }}
                  >
                    <i className={`bi ${stat.icon}`} style={{ fontSize: '1.8rem', color: stat.color }} />
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', lineHeight: 1.2, marginTop: '0.5rem' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.25rem' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Categories ── */}
      <section className="section-sm" style={{ background: 'var(--fk-surface)', borderBottom: '1px solid var(--fk-border)' }}>
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Browse by Category</h5>
            <Link to="/ideas" style={{ fontSize: '0.9rem', color: 'var(--fk-primary)', textDecoration: 'none' }}>
              View all <i className="bi bi-arrow-right" />
            </Link>
          </div>
          <div className="d-flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                to={`/ideas?category=${cat}`}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid var(--fk-border)',
                  background: 'var(--fk-surface)',
                  color: 'var(--fk-text-primary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.target.style.background = 'var(--fk-primary)'
                  e.target.style.color = '#fff'
                  e.target.style.borderColor = 'var(--fk-primary)'
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'var(--fk-surface)'
                  e.target.style.color = 'var(--fk-text-primary)'
                  e.target.style.borderColor = 'var(--fk-border)'
                }}
              >
                {cat}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Featured Ideas ── */}
      <section className="section">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-5">
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Featured Ideas</h2>
              <p style={{ color: 'var(--fk-text-secondary)', margin: 0 }}>
                Explore the latest approved ideas from our entrepreneurs
              </p>
            </div>
            <Link to="/ideas">
              <Button variant="outline-primary" style={{ borderRadius: 'var(--radius-pill)' }}>
                See All <i className="bi bi-arrow-right ms-1" />
              </Button>
            </Link>
          </div>

          {featured.length > 0 ? (
            <Row className="g-4">
              {featured.map(idea => (
                <Col key={idea._id} md={6} lg={4}>
                  <IdeaCard idea={idea} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-lightbulb" style={{ fontSize: '3rem', color: 'var(--fk-border)' }} />
              <p className="mt-3" style={{ color: 'var(--fk-text-muted)' }}>
                No approved ideas yet. Be the first to submit one!
              </p>
              {user?.role === 'entrepreneur' && (
                <Button as={Link} to="/create-idea" variant="primary" style={{ borderRadius: 'var(--radius-pill)' }}>
                  Submit Your Idea
                </Button>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* ── How It Works ── */}
      <section className="section" style={{ background: 'var(--fk-surface)' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>How Fikretak Works</h2>
            <p style={{ color: 'var(--fk-text-secondary)' }}>Three simple steps to connect ideas with capital</p>
          </div>
          <Row className="g-4 justify-content-center">
            {[
              { step: '01', icon: 'bi-person-plus', title: 'Create Your Account', desc: 'Sign up as an entrepreneur or investor and build your profile.' },
              { step: '02', icon: 'bi-file-earmark-plus', title: 'Submit or Discover', desc: 'Entrepreneurs post ideas. Investors browse and filter by interest.' },
              { step: '03', icon: 'bi-handshake', title: 'Connect & Grow', desc: 'Investors express interest and the collaboration begins.' },
            ].map(item => (
              <Col key={item.step} md={4}>
                <div className="text-center p-4">
                  <div
                    style={{
                      width: 72, height: 72,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--fk-primary), var(--fk-primary-light))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.25rem',
                    }}
                  >
                    <i className={`bi ${item.icon}`} style={{ fontSize: '1.8rem', color: '#fff' }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--fk-accent)', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                    STEP {item.step}
                  </div>
                  <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{item.title}</h5>
                  <p style={{ color: 'var(--fk-text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ background: 'var(--fk-accent-soft)', padding: '4rem 0' }}>
        <Container className="text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--fk-text-primary)' }}>
            Ready to bring your idea to life?
          </h2>
          <p style={{ color: 'var(--fk-text-secondary)', marginBottom: '2rem' }}>
            Join hundreds of entrepreneurs and investors already on Fikretak.
          </p>
          <Button
            as={Link} to="/register"
            size="lg"
            style={{
              background: 'var(--fk-primary)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              padding: '0.75rem 2.5rem',
            }}
          >
            Join Fikretak Today
          </Button>
        </Container>
      </section>
    </>
  )
}
