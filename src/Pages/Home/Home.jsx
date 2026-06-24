import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './Home.css'

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
  { icon: 'bi-graph-up', title: 'Investor', sub: 'Fund promising opportunities' },
]

const CHECKLIST = [
  'Browse 500+ startups seeking funding',
  'Connect with verified investors',
  'Track project milestones and growth',
  'Access startup resources and tools',
  'Apply to investment opportunities instantly',
  'Launch your startup in a few clicks',
  'Manage your startup progress in one dashboard',
]

const FOOTER_LINKS = {
  Product: ['Features', 'How it works', 'Pricing'],
  Company: ['About', 'Blog', 'Careers'],
  Legal: ['Privacy', 'Terms', 'Contact'],
}

export default function Home() {
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* ── HERO ── */}
      <section style={{
        background: 'radial-gradient(circle at 80% 30%, #092244 0%, #030a16 55%, #020712 100%)',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem 5rem',
      }}>

        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(2.8rem, 5.5vw, 4.4rem)',
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
          Connect innovators with investors. Turn
          your ideas into real projects with role-based collaboration.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>

          <Link
            to="/login"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Start Your Journey <span>→</span>
          </Link>

          <a
            href="#about"
            className="btn-secondary"
          >
            Learn More
          </a>

        </div>


        {/* Stats */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            gap: 'clamp(2rem, 6vw, 5rem)',
            marginTop: '5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '14px 36px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            overflow: 'hidden',
          }}
        >

          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 999,
              padding: 2,
              background: 'linear-gradient(90deg, #2f6bd6, #4ecdc4, #2f6bd6)',
              backgroundSize: '200% 200%',
              animation: 'borderGlow 4s linear infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            }}
          />

          {[
            { val: '10k+', label: 'Active Users' },
            { val: '5k+', label: 'Projects' },
            { val: '500+', label: 'Investors' },
          ].map((s, i, arr) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  color: '#fff',
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  fontWeight: 700
                }}>
                  {s.val}
                </span>
                <div style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.8rem',
                  marginTop: 3
                }}>
                  {s.label}
                </div>
              </div>

              {i < arr.length - 1 && (
                <div style={{
                  width: 1,
                  height: 36,
                  background: 'rgba(255,255,255,0.12)',
                  flexShrink: 0,
                }} />
              )}
            </div>
          ))}
        </div>
      </section>



      {/* ── FEATURES GRID ── */}

      <section
        id="features"
        style={{
          background: 'radial-gradient(circle at 50% 20%, #dbeafe 0%, #eff6ff 40%, #ffffff 100%)',
          padding: '5rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.5px', color: '#0f1117', marginBottom: '0.75rem' }}>
              Everything you need to succeed
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>
              Built for innovators and entrepreneurs who want to turn ideas into reality
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.66rem',
              width: '100%',
            }}>
            {FEATURES.map((f) => (
              <div key={f.title} className='feature-card'>
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: '2rem',
                    border: '1px solid rgba(0,0,0,0.06)',
                    height: '100%',
                  }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: '#1a3a6b',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                    }}>

                    <i className={`bi ${f.icon}`} style={{ color: '#fff', fontSize: '1.3rem' }} />
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f1117' }}>
                    {f.title}
                  </h3>

                  <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FROM IDEA TO FUNDED STARTUP ── */}
      <section
        id="about"
        style={{
          background: 'radial-gradient(circle at 50% 10%, #f1f7fe 0%, #eff6ff 45%, #ffffff 100%)',
          padding: '5rem 1.5rem',
        }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}>

          {/* LEFT */}
          <div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#0f1117',
              marginBottom: '1.25rem',
            }}>
              From Idea to Funded Startup
            </h2>

            <p style={{
              color: '#6b7280',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              fontSize: '0.95rem',
            }}>
              Join 10,000+ entrepreneurs and 486 active investors
              building the future together. Your complete startup journey starts here.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {CHECKLIST.map(item => (
                <li key={item} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                  color: '#374151',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: '#11265e',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    flexShrink: 0, // FIX 2: Prevents checklist dots from squishing
                  }}>
                    <i className="bi bi-check-lg" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div
            style={{
              background: '#04293f', // FIX 3: Corrected invalid broken gradient syntax to flat hex
              borderRadius: 22,
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              // FIX 4: Changed hardcoded margins to fluid percentages so it wraps cleanly without overflowing
              marginTop: 'clamp(0rem, 5vw, 6rem)',
              marginLeft: 'clamp(0rem, 4vw, 3rem)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              border: '1px solid rgba(59,130,246,0.15)',
            }}
          >
            {ROLES.map(r => (
              <div
                key={r.title}
                style={{
                  background: '#ffffff',
                  borderRadius: 14,
                  padding: '1.2rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid rgba(59,130,246,0.15)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    background: '#11265e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0, // FIX 5: Forces the icon container to remain a perfect circle
                  }}
                >
                  <i className={`bi ${r.icon}`} style={{ color: '#fff', fontSize: '1.2rem' }} />
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f1117' }}>
                    {r.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: 2 }}>
                    {r.sub}
                  </div>
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

        {/* Decorative sparkle */}
        <div
          style={{
            position: 'absolute',
            right: '28%',
            bottom: '30%',
            fontSize: '3rem',
            color: 'rgba(255,255,255,.45)',
          }}>
        </div>
      </section>

    </div>
  )
}
