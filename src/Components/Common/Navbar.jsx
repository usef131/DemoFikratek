import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Navbar as BSNavbar, Nav, Container, Button, Dropdown } from 'react-bootstrap'
import { useAuth } from '../../../Context/AuthContext'
export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <BSNavbar expand="lg" className="fk-navbar" sticky="top">
      <Container>
        {/* Brand */}
        <BSNavbar.Brand as={Link} to="/" className="fk-navbar-brand d-flex align-items-center gap-2">
          <span style={{
            fontWeight: 800,
            fontSize: '1.2rem',
            color: '#fff',
            letterSpacing: '-0.5px',
          }}>
            فكرتك Fikretak
          </span>
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="main-nav" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
          <span style={{ filter: 'invert(1)' }} className="navbar-toggler-icon" />
        </BSNavbar.Toggle>
        <div className="d-flex align-items-center gap-3">
          <Button
            as={Link} to="/login"
            variant="outline-light"
            size="sm"
            style={{ borderRadius: 'var(--radius-pill)', padding: '6px 18px' }}
          >
            Sign In
          </Button>
          <Button
            as={Link} to="/register"
            size="sm"
            style={{
              borderRadius: 'var(--radius-pill)',
              background: 'var(--fk-primary-btn)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '6px 18px',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            Get Started
          </Button>
        </div>
      </Container>
    </BSNavbar>
    

  )
}
