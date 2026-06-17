import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--fk-text-primary)',
      color: 'rgba(255,255,255,0.7)',
      fontFamily: 'var(--font-body)',
      paddingTop: '3rem',
      paddingBottom: '2rem',
    }}>
      <Container>
        <Row className="g-4 mb-4">
          <Col md={4}>
            <div className="mb-3">
              <span style={{
                background: 'var(--fk-accent)',
                color: '#fff',
                borderRadius: '8px',
                padding: '4px 10px',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
              }}>
                فكرتك · Fikretak
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
              Bridging young entrepreneurs with visionary investors.
              Turn your idea into reality.
            </p>
          </Col>

          <Col md={2} className="offset-md-2">
            <h6 style={{ color: '#fff', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Platform</h6>
            <ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
              <li className="mb-2"><Link to="/ideas" style={{ color: 'inherit', textDecoration: 'none' }}>Browse Ideas</Link></li>
              <li className="mb-2"><Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>Join as Investor</Link></li>
              <li className="mb-2"><Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>Submit Your Idea</Link></li>
            </ul>
          </Col>

          <Col md={2}>
            <h6 style={{ color: '#fff', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Team</h6>
            <ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
              <li className="mb-2">Beshoy Hany</li>
              <li className="mb-2">Youssef Ahmed</li>
              <li className="mb-2">Ahmed Ibrahim</li>
              <li className="mb-2">Mahmoud Mostafa</li>
              <li className="mb-2">Rama Daif Allah</li>
              <li className="mb-2">Hana Ali</li>
            </ul>
          </Col>
        </Row>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <p className="mb-0 text-center" style={{ fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Fikretak. Built with <span style={{ color: 'var(--fk-accent)' }}>♥</span> by the Fikretak Team.
          </p>
        </div>
      </Container>
    </footer>
  )
}
