import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="fk-footer">
      <Container>
        <Row className="g-4 mb-4">
          {/* Brand */}
          <Col md={4}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: '0.75rem' }}>
              Fikretak
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', maxWidth: 260 }}>
              Where ideas meet action. Building the future of collaboration between entrepreneurs and investors.
            </p>
          </Col>

          <Col md={2} className="offset-md-2">
            <h6>Product</h6>
            <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><Link to="/ideas">Browse Ideas</Link></li>
              <li><Link to="/register">How it works</Link></li>
              <li><Link to="/register">Pricing</Link></li>
            </ul>
          </Col>

          <Col md={2}>
            <h6>Company</h6>
            <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Blog</Link></li>
              <li><Link to="/">Careers</Link></li>
            </ul>
          </Col>

          <Col md={2}>
            <h6>Legal</h6>
            <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><Link to="/">Privacy</Link></li>
              <li><Link to="/">Terms</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </Col>
        </Row>

        <hr className="fk-footer-divider" />

        <p style={{ fontSize: '0.8rem', textAlign: 'center', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          © {new Date().getFullYear()} Fikretak. All rights reserved. Built with{' '}
          <span style={{ color: '#e5503a' }}>♥</span> by the Fikretak Team.
        </p>
      </Container>
    </footer>
  )
}
