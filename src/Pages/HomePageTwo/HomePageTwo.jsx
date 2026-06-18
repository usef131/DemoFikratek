import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import {
  Container, Row, Col, Card, Button, Badge,
  ProgressBar, Form, InputGroup, Navbar, Nav, NavDropdown, Dropdown, NavLink
} from "react-bootstrap";
import { FiHome, FiCompass, FiGift, FiAward, FiUser, FiLogOut } from "react-icons/fi";
import { BsMoon } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

// ── palette ──────────────────────────────────────────────────────────────────
const NAVY = "#0f2744";



// ── mock data ─────────────────────────────────────────────────────────────────
const STATS = [
  { emoji: "💡", value: "2,547", label: "Ideas Shared", delta: "+12.5%" },
  { emoji: "💲", value: "486", label: "Active Investors", delta: "+8.3%" },
  { emoji: "🚀", value: "143", label: "Projects Funded", delta: "+15.7%" },
  { emoji: "👥", value: "1,089", label: "Collaborations", delta: "+20.1%" },
];

const STARTUPS = [
  {
    id: 1,
    name: "EcoTrack – Sustainability App",
    category: "Climate Tech",
    badge: "Prototype",
    badgeBg: "warning",
    desc: "Mobile app helping individuals track and reduce their carbon footprint through daily activity…",
    funding: "$50K", team: "3 members", progress: 35,
  },
  {
    id: 2,
    name: "HealthAI Assistant",
    category: "Healthcare",
    badge: "Idea",
    badgeBg: "secondary",
    desc: "AI-powered health companion providing personalized wellness recommendations and early alerts…",
    funding: "$100K", team: "2 members", progress: 15,
  },
  {
    id: 3,
    name: "StudyHub – Learning Platform",
    category: "EdTech",
    badge: "Launched",
    badgeBg: "success",
    desc: "Collaborative learning platform connecting students with peer tutors and AI-powered study tools…",
    funding: "$75K", team: "5 members", progress: 80,
  },
];

const MENTORS = [
  {
    id: 1,
    initials: "DS",
    name: "Dr. Sarah Chen",
    sessions: 127,
    rating: 4.9,
    bio: "Former VP of AI at TechCorp, 15+ years scaling AI startups.",
    tags: ["AI/ML", "Product Strategy"],
  },
  {
    id: 2,
    initials: "MR",
    name: "Marcus Rodriguez",
    sessions: 89,
    rating: 4.8,
    bio: "Growth leader at multiple unicorns. B2B SaaS expert.",
    tags: ["Marketing", "Growth"],
  },
];

// ── helpers ───────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 44, bg = NAVY }) {
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: bg, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700, fontSize: size * 0.33, flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ── component ─────────────────────────────────────────────────────────────────
export default function HomePageTwo() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { user} = useAuth()

  return (
    <div style={{ background: "#f5f6f8", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>


      {/* ── Navbar ── */}

      <Navbar bg="white" className="shadow-sm py-1 border-bottom">
        <Container fluid className="px-5">
          {/* Logo */}
          <Navbar.Brand
            href="#"
            className="fw-bold fs-1 text-dark me-5"
          >
            Fikretak
          </Navbar.Brand>

          {/* Center Navigation */}
          <Nav className="mx-auto gap-4 align-items-center">
            <Nav.Link
              href="#"
              className="d-flex align-items-center gap-2 px-4 py-2 rounded-pill bg-light text-primary fw-medium"
            >
              <FiHome size={20} />
              Home
            </Nav.Link>

            <Nav.Link className="d-flex align-items-center gap-2 text-secondary" style={{ cursor: "pointer" }} onClick={() => navigate("/marketplace")}>
              <FiCompass size={20} />
              Marketplace
            </Nav.Link>

            <Nav.Link className="d-flex align-items-center gap-2 text-secondary" style={{ cursor: "pointer" }} onClick={() => navigate("/collaborate")}>
              <FiGift size={20} />
              Collaborate
            </Nav.Link>

            <Nav.Link className="d-flex align-items-center gap-2 text-secondary" style={{ cursor: "pointer" }} onClick={() => navigate("/mentors")}>
              <FiAward size={20} />
              Mentors
            </Nav.Link>

            <Nav.Link className="d-flex align-items-center gap-2 text-secondary" style={{ cursor: "pointer" }} onClick={() => navigate("/Profile")}>
              <FiUser size={20} />
              Profile
            </Nav.Link>
          </Nav>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-4">


            <Link to="/Profile" style={{
              width: 36,
              height: 36,
              borderRadius: '50%',   // <-- makes it a circle
              background: 'var(--fk-primary-btn)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}>
              {user?.name?.slice(0, 2).toUpperCase() || 'U'}
            </Link>

            <FiLogOut
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            />
          </div>

        </Container>
      </Navbar>
      {/* ── Hero ── */}
      <div style={{ background: "#fff", paddingTop: 56, paddingBottom: 40 }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="fw-bold mb-2" style={{ fontSize: "clamp(26px,4vw,40px)" }}>
                Welcome to Fikretak
              </h1>
              <p className="text-muted mb-4">
                Connect with innovators, find funding, get expert mentorship, and build your dream team
              </p>

              <InputGroup className="mb-4 mx-auto" style={{ maxWidth: 560 }}>
                <InputGroup.Text style={{ background: "#fff", border: "1px solid #D1D5DB", borderRight: "none" }}>
                  🔍
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search projects, investors, mentors, industries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ border: "1px solid #D1D5DB", borderLeft: "none", boxShadow: "none" }}
                />
              </InputGroup>

              <div className="d-flex gap-2 flex-wrap justify-content-center">
                <Button
                  style={{ background: NAVY, border: "none" }}
                  onClick={() => navigate("/create-idea")}
                >
                  💡 Add Project
                </Button>
                <Button variant="outline-secondary" onClick={() => navigate("/ideas")}>Browse Projects</Button>
                <Button variant="outline-secondary" onClick={() => navigate("/mentors")}>Find Mentors</Button>
                <Button variant="outline-secondary" onClick={() => navigate("/collaborate")}>Join Teams</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ── Stats ── */}
      <Container className="my-4">
        <Row className="g-3">
          {STATS.map((s) => (
            <Col key={s.label} xs={6} lg={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div
                      style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: NAVY, display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: 18,
                      }}
                    >
                      {s.emoji}
                    </div>
                    <span className="text-success fw-semibold" style={{ fontSize: 13 }}>{s.delta}</span>
                  </div>
                  <p className="fw-bold mb-0" style={{ fontSize: 26 }}>{s.value}</p>
                  <p className="text-muted mb-0" style={{ fontSize: 13 }}>{s.label}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ── Featured Startups ── */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 className="fw-bold mb-0">Featured Startups</h4>
            <p className="text-muted mb-0" style={{ fontSize: 14 }}>Trending projects seeking funding and collaboration</p>
          </div>
          <Button variant="link" style={{ color: NAVY, fontWeight: 600 }} onClick={() => navigate("/ideas")}>
            View All →
          </Button>
        </div>

        <Row className="g-3">
          {STARTUPS.map((s) => (
            <Col key={s.id} md={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <div>
                      <Card.Title className="mb-0 fw-bold" style={{ fontSize: 15 }}>{s.name}</Card.Title>
                      <small className="text-muted">{s.category}</small>
                    </div>
                    <Badge bg={s.badgeBg} className="ms-2" style={{ fontSize: 11 }}>{s.badge}</Badge>
                  </div>

                  <Card.Text className="text-secondary mt-2 flex-grow-1" style={{ fontSize: 13 }}>
                    {s.desc}
                  </Card.Text>

                  <div className="d-flex gap-3 mb-2">
                    <small><span className="text-muted">Funding</span> <strong>{s.funding}</strong></small>
                    <small><span className="text-muted">Team</span> <strong>{s.team}</strong></small>
                  </div>

                  <div className="d-flex justify-content-between mb-1">
                    <small className="text-muted">Funding Progress</small>
                    <small className="text-muted">{s.progress}%</small>
                  </div>
                  <ProgressBar
                    now={s.progress}
                    style={{ height: 6, marginBottom: 16 }}
                    variant={undefined}
                    className="fikretak-bar"
                  />

                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      style={{ background: NAVY, border: "none", flex: 1 }}
                      onClick={() => navigate(`/ideas/${s.id}`)}
                    >
                      👁 View Project
                    </Button>
                    <Button size="sm" variant="outline-secondary">Invest</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ── Expert Mentors ── */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 className="fw-bold mb-0">Expert Mentors</h4>
            <p className="text-muted mb-0" style={{ fontSize: 14 }}>Get guidance from experienced entrepreneurs</p>
          </div>
          <Button variant="link" style={{ color: NAVY, fontWeight: 600 }} onClick={() => navigate("/mentors")}>
            View All →
          </Button>
        </div>

        <Row className="g-3">
          {MENTORS.map((m) => (
            <Col key={m.id} md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex gap-3 align-items-center mb-2">
                    <Avatar initials={m.initials} />
                    <div>
                      <p className="fw-bold mb-0" style={{ fontSize: 15 }}>{m.name}</p>
                      <small className="text-muted">🎓 {m.sessions} sessions &nbsp; ★ {m.rating}</small>
                    </div>
                  </div>

                  <p className="text-secondary mb-2" style={{ fontSize: 13 }}>{m.bio}</p>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {m.tags.map((t) => (
                      <Badge key={t} bg="primary" style={{ background: "#EFF6FF", color: "#1D4ED8", fontWeight: 500, fontSize: 12 }}>
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="d-flex gap-2">
                    <Button style={{ background: NAVY, border: "none", flex: 1 }} size="sm">
                      📅 Book Session
                    </Button>
                    <Button variant="outline-secondary" size="sm">💬</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ── Trending Opportunities ── */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 className="fw-bold mb-0">Trending Opportunities</h4>
            <p className="text-muted mb-0" style={{ fontSize: 14 }}>Join innovative teams and build something amazing</p>
          </div>
          <Button variant="link" style={{ color: NAVY, fontWeight: 600 }} onClick={() => navigate("/collaborate")}>
            View All →
          </Button>
        </div>

        <Row className="g-3">
          {/* Opportunity card */}
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100" style={{ borderLeft: `4px solid ${NAVY}` }}>
              <Card.Body>
                <div className="d-flex gap-3 align-items-center mb-2">
                  <Avatar initials="👥" bg={NAVY} />
                  <div>
                    <p className="fw-bold mb-0" style={{ fontSize: 15 }}>Technical Co-Founder</p>
                    <small className="text-muted">CryptoWallet Pro</small>
                  </div>
                </div>
                <p className="text-secondary mb-3" style={{ fontSize: 13 }}>
                  Seeking a technical co-founder with blockchain expertise to build next-gen crypto wallet.
                </p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <small className="text-muted">⏱ Full-time &nbsp; ↑ 25-35% equity</small>
                  <small className="text-muted">3 days ago</small>
                </div>
                <Button className="w-100" style={{ background: NAVY, border: "none" }} size="sm">
                  Apply Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Post Your Opening */}
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100 text-center" style={{ background: "#F3F4F6" }}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center gap-2 py-4">
                <span style={{ fontSize: 44 }}>🏅</span>
                <h6 className="fw-bold mb-1">Post Your Opening</h6>
                <p className="text-muted mb-3" style={{ fontSize: 13 }}>
                  Looking for talented team members? Post your opportunity here.
                </p>
                <Button style={{ background: NAVY, border: "none" }} onClick={() => navigate("/collaborate")}>
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ── CTA Banner ── */}
      <div style={{ background: NAVY, padding: "56px 24px", textAlign: "center" }}>
        <h2 className="fw-bold text-white mb-2">Ready to Build the Future?</h2>
        <p style={{ color: "#CBD5E1", marginBottom: 28 }}>
          Join thousands of entrepreneurs, investors, and innovators transforming ideas into reality
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Button
            style={{ background: "#fff", color: NAVY, border: "none", fontWeight: 700, padding: "10px 24px" }}
            onClick={() => navigate("/create-idea")}
          >
            Submit Your Project
          </Button>
          <Button
            style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.3)", fontWeight: 700, padding: "10px 24px" }}
            onClick={() => navigate("/ideas")}
          >
            Explore Opportunities
          </Button>
        </div>
      </div>

      {/* ── progress bar colour override ── */}
      <style>{`
        .fikretak-bar .progress-bar { background-color: ${NAVY} !important; }
      `}</style>

    </div>
  );
}