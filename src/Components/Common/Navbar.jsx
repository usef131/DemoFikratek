import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Navbar as BSNavbar, Nav, Container, Button, Dropdown } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <BSNavbar
      expand="lg"
      style={{
        background: 'var(--fk-surface)',
        borderBottom: '1px solid var(--fk-border)',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'var(--font-display)',
      }}
      sticky="top"
    >
      <Container>
        {/* Brand */}
        <BSNavbar.Brand as={Link} to="/" className="fw-800 d-flex align-items-center gap-2">
          <span
            style={{
              background: 'var(--fk-primary)',
              color: '#fff',
              borderRadius: '8px',
              padding: '4px 10px',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '-0.5px',
            }}
          >
            فكرتك
          </span>
          <span style={{ color: 'var(--fk-primary)', fontWeight: 700, fontSize: '1.05rem' }}>
            Fikretak
          </span>
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="main-nav" />

        <BSNavbar.Collapse id="main-nav">
          <Nav className="me-auto gap-1">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/ideas">Browse Ideas</Nav.Link>
            {user?.role === 'entrepreneur' && (
              <Nav.Link as={NavLink} to="/create-idea">
                <i className="bi bi-plus-circle me-1" />
                Submit Idea
              </Nav.Link>
            )}
            {user?.role === 'admin' && (
              <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
            )}
          </Nav>

          <Nav className="gap-2 align-items-center">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-primary"
                  size="sm"
                  id="user-menu"
                  style={{ borderRadius: 'var(--radius-pill)' }}
                >
                  <i className="bi bi-person-circle me-1" />
                  {user.name?.split(' ')[0]}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--fk-border)' }}>
                  <Dropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person me-2" />My Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <i className="bi bi-box-arrow-right me-2" />Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-primary" size="sm"
                  style={{ borderRadius: 'var(--radius-pill)' }}>
                  Sign In
                </Button>
                <Button as={Link} to="/register" variant="primary" size="sm"
                  style={{ borderRadius: 'var(--radius-pill)' }}>
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
