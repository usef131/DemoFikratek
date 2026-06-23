import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'

const FEATURES = [
  {
    icon: 'bi-rocket-takeoff',
    title: 'Project Marketplace',
    desc: 'Discover and invest in innovative startups. Browse structured project cards with funding goals, team info, and progress tracking.',
  },
  {
    icon: 'bi-people',
    title: 'Collaboration Board',
    desc: 'Find co-founders, developers, designers, and marketers. Join teams building the next big thing.',
  },
  {
    icon: 'bi-award',
    title: 'Expert Mentorship',
    desc: 'Book sessions with experienced entrepreneurs. Get guidance on fundraising, product, growth, and more.',
  },
  {
    icon: 'bi-currency-dollar',
    title: 'Investor Matching',
    desc: 'Smart recommendations connect investors with startups matching their interests and investment thesis.',
  },
  {
    icon: 'bi-graph-up-arrow',
    title: 'Progress Tracking',
    desc: 'Track funding milestones, team updates, and growth metrics. Stay informed on every project\'s journey.',
  },
  {
    icon: 'bi-lightbulb',
    title: 'Idea Validation',
    desc: 'Share concepts, get feedback, and validate market fit before building. Community-driven innovation.',
  },
]

const ROLES = [
  { icon: 'bi-lightbulb-fill', title: 'Entrepreneur', sub: 'Share your groundbreaking ideas' },
  { icon: 'bi-graph-up',       title: 'Investor',  sub: 'Fund promising opportunities' },
]

const CHECKLIST = [
  'Browse 500+ startups seeking funding',
  'Connect with verified investors',
  'Book mentorship sessions in minutes',
  'Track project milestones and growth',
  'Find co-founders and team members',
  'Access startup resources and tools',
]

const FOOTER_LINKS = {
  Product: ['Features', 'How it works', 'Pricing'],
  Company: ['About', 'Blog', 'Careers'],
  Legal:   ['Privacy', 'Terms', 'Contact'],
}

export default function Home() {
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(180deg, #0f1117 70%, #1a1f2e 100%)',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem 5rem',
      }}>
        {/* Pill badge */}
        <div style={{
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 999,
          padding: '6px 18px',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.82rem',
          marginBottom: '2rem',
          letterSpacing: '0.3px',
        }}>
          Where Ideas Meet Action
        </div>

        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(2.5rem, 7vw, 4.2rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-1.5px',
          maxWidth: 820,
          marginBottom: '1.5rem',
        }}>
          Welcome to Fikretak
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          maxWidth: 560,
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          Connect innovators with developers, investors, and experts. Turn
          your ideas into real projects with role-based collaboration.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/login" style={{
            background: '#1a3a6b',
            color: '#fff',
            textDecoration: 'none',
            padding: '14px 32px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}>
            Start Your Journey <span>→</span>
          </Link>
          <a href="#about" style={{
            background: 'rgba(255,255,255,0.08)',
            color: '#fff',
            textDecoration: 'none',
            padding: '14px 32px',
            borderRadius: 999,
            fontWeight: 600,
            fontSize: '1rem',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: 'clamp(2rem, 6vw, 5rem)',
          marginTop: '5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {[
            { val: '10k+', label: 'Active Users' },
            { val: '5k+',  label: 'Projects' },
            { val: '500+', label: 'Investors' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ color: '#3b7dd8', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-1px' }}>
                {s.val}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="features" style={{ background: '#f5f5f7', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.5px', color: '#0f1117', marginBottom: '0.75rem' }}>
              Everything you need to succeed
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
              Built for innovators, entrepreneurs, and creators who want to turn ideas into reality
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                background: '#fff',
                borderRadius: 16,
                padding: '2rem',
                border: '1px solid rgba(0,0,0,0.06)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                <div style={{
                  width: 48, height: 48,
                  background: '#1a3a6b',
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  <i className={`bi ${f.icon}`} style={{ color: '#fff', fontSize: '1.3rem' }} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f1117', marginBottom: '0.5rem' }}>
                  {f.title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FROM IDEA TO FUNDED STARTUP ── */}
      <section id="about" style={{ background: '#fff', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>

          {/* Left copy */}
          <div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.5px', color: '#0f1117', lineHeight: 1.2, marginBottom: '1.25rem' }}>
              From Idea to Funded Startup
            </h2>
            <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Join 10,000+ entrepreneurs, 486 active investors, and hundreds of expert mentors
              building the future together. Your complete startup journey starts here.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {CHECKLIST.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#374151' }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: '#1a3a6b',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', flexShrink: 0,
                  }}>
                    <i className="bi bi-check-lg" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right role cards */}
          <div style={{
            background: '#f5f5f7',
            borderRadius: 20,
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {ROLES.map(r => (
              <div key={r.title} style={{
                background: '#fff',
                borderRadius: 14,
                padding: '1.2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: '50%',
                  background: '#1a3a6b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <i className={`bi ${r.icon}`} style={{ color: '#fff', fontSize: '1.2rem' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f1117' }}>{r.title}</div>
                  <div style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: 2 }}>{r.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        background: '#0f1117',
        padding: '5rem 1.5rem',
        textAlign: 'center',
      }}>
        <h2 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '1rem' }}>
          Join the Startup Revolution
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          2,500+ ideas validated • $45M+ in funding raised • 1,000+ teams formed
        </p>
        <Link to="/register" style={{
          background: '#1a3a6b',
          color: '#fff',
          textDecoration: 'none',
          padding: '14px 32px',
          borderRadius: 999,
          fontWeight: 700,
          fontSize: '1rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}>
          Get Started for Free <span>→</span>
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
         background: '#0f1117',
         borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '3rem 1.5rem 2rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            {/* Brand */}
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                Fikretak
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>
                Where ideas meet action. Building the future of collaboration.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([col, links]) => (
              <div key={col}>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {col}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {links.map(l => (
                    <li key={l}>
                      <a href="#" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', textDecoration: 'none' }}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', margin: 0 }}>
              © 2026 Fikretak. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
