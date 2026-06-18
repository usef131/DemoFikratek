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

        <BSNavbar.Collapse id="main-nav">
          <Nav className="me-auto gap-1 ms-3" />
          <Nav className="gap-2 align-items-center">
            {user ? (
              <>
                {/* Avatar dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    id="user-menu"
                  >
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'var(--fk-primary-btn)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                    }}>
                      {user.name?.slice(0, 2).toUpperCase() || 'U'}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--fk-border)',
                    boxShadow: 'var(--shadow-md)',
                    padding: '0.5rem',
                    minWidth: 180,
                  }}>
                    <div style={{ padding: '0.5rem 0.75rem 0.75rem', borderBottom: '1px solid var(--fk-border)', marginBottom: '0.25rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--fk-text-muted)', textTransform: 'capitalize' }}>{user.role}</div>
                    </div>
                    <Dropdown.Item as={Link} to="/profile" style={{ borderRadius: 8, fontSize: '0.875rem' }}>
                      <i className="bi bi-person me-2" />Profile
                    </Dropdown.Item>
                    <Dropdown.Divider style={{ margin: '0.25rem 0' }} />
                    <Dropdown.Item onClick={handleLogout} className="text-danger" style={{ borderRadius: 8, fontSize: '0.875rem' }}>
                      <i className="bi bi-box-arrow-right me-2" />Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
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
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}
