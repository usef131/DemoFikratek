import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { Container, Row, Col, Button, Table, } from "react-bootstrap";
import SecondNavbar from "../../Components/Common/SecondNavbar";
import Footer from "../../Components/Common/Footer";
import PageTransition from "../../Components/PageTransition";
import FeaturedStartupRow from "../../Components/Cards/FeaturedStartupRow";
import "./HomeTwo.css";
import { useState, useEffect } from "react"


const NAVY = "#0f2744";



// ── mock data ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2,547", label: "Ideas Shared", delta: "+12.5%" },
  { value: "486", label: "Active Investors", delta: "+8.3%" },
  { value: "143", label: "Projects Funded", delta: "+15.7%" },
  { value: "1,089", label: "Collaborations", delta: "+20.1%" },
];


// ── component ─────────────────────────────────────────────────────────────────
export default function HomePageTwo() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { user } = useAuth()
  const [startups, setStartups] = useState([])

  useEffect(() => {
    fetch('http://localhost:5002/api/ideas')
      .then(res => res.json())
      .then(data => {
        console.log("ideas from API:", data)
        setStartups(data.ideas || data)
      })
      .catch(err => console.error('Failed to fetch ideas:', err))
  }, [])

  return (
    <div style={{ background: "#f5f6f8", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>


      {/* ── Navbar ── */}
      <SecondNavbar />

      {/* ── Profile completion banner ── */}
      {user?.role === 'investor' && (!user?.bio || !user?.sectors?.length || !user?.ticketSize || !user?.location) && (
        <div style={{
          background: '#fefce8',
          borderBottom: '1px solid #fde68a',
          padding: '12px 0',
        }}>
          <Container className="d-flex align-items-center justify-content-between flex-wrap" style={{ gap: 10 }}>
            <div className="d-flex align-items-center" style={{ gap: 10 }}>
              <i className="bi bi-exclamation-circle-fill" style={{ color: '#d97706', fontSize: '1.1rem' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#92400e' }}>
                Complete your investor profile so entrepreneurs can find you
              </span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {!user?.bio && <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '20px', background: '#fde68a', color: '#92400e', fontWeight: 600 }}>Bio</span>}
                {!user?.location && <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '20px', background: '#fde68a', color: '#92400e', fontWeight: 600 }}>Location</span>}
                {!user?.ticketSize && <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '20px', background: '#fde68a', color: '#92400e', fontWeight: 600 }}>Ticket size</span>}
                {!user?.sectors?.length && <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '20px', background: '#fde68a', color: '#92400e', fontWeight: 600 }}>Sectors</span>}
              </div>
            </div>
            <button
              onClick={() => navigate('/edit-profile')}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: '1.5px solid #d97706',
                background: '#fff',
                color: '#92400e',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Complete Profile →
            </button>
          </Container>
        </div>
      )}
      {/* ── Hero ── */}

      <div
        style={{
          background:
            "linear-gradient(180deg, #E6F0FF 0%, #F5F9FF 45%, #FFFFFF 100%)",
          paddingTop: "90px",
          paddingBottom: "120px",
        }}
      >
        <PageTransition>

          <Container>
            <Row className="justify-content-center text-center">
              <Col lg={10}>

                {/* Heading */}
                <h1
                  style={{
                    fontSize: "clamp(58px,7vw,84px)",
                    fontWeight: 800,
                    lineHeight: "1",
                    letterSpacing: "-3px",
                    marginBottom: "28px",
                    color: "#111827",
                  }}
                >
                  Welcome to{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #032A6E 0%, #0A3D91 60%, #1E5BB8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",

                    }}
                  >
                    Fikretak
                  </span>
                </h1>

                {/* Description */}
                <p
                  style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    color: "#6B7280",
                    fontSize: "15px",
                    lineHeight: "1.8",
                  }}
                >
                  The professional ecosystem where innovators find funding,
                  and the teams they need to scale. Connect with the
                  right people to turn your vision into reality.
                </p>

                {/* Buttons */}
                <div
                  className="d-flex justify-content-center flex-wrap"
                  style={{
                    gap: "14px",
                    marginTop: "50px",
                  }}
                >
                  {user?.role === "entrepreneur" ? (
                    <>
                      <Button
                        className="main-btn primary-btn"
                        onClick={() => navigate("/create-idea")}
                      >
                        ⊕ Add Project
                      </Button>

                      <Button
                        className="main-btn white-btn"
                        onClick={() => navigate("/Browse-projects")}
                      >
                        Browse Projects
                      </Button>

                      <Button
                        className="main-btn white-btn"
                        onClick={() => navigate("/investor")}
                      >
                        Find Investors
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="main-btn primary-btn"
                      style={{
                        fontSize: "18px",
                        padding: "20px 60px",
                        minWidth: "260px",
                      }}
                      onClick={() => navigate("/Browse-projects")}
                    >
                      Browse Projects
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Container>

        </PageTransition>
      </div>


      {/* ── Stats ── */}
      <Container
        fluid
        style={{
          background: "#fff",
          padding: "35px 90px",
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee",
        }}
      >
        <Row>
          {STATS.map((s, index) => (
            <Col
              key={s.label}
              xs={6}
              lg={3}
              style={{
                borderRight:
                  index !== STATS.length - 1 ? "1px solid #e5e7eb" : "none",
              }}
            >
              <div className="ps-lg-4">
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#1e4ea8",
                    marginBottom: "8px",
                  }}
                >
                  {s.label}
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: 700,
                      color: "#111827",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>

                  <span
                    style={{
                      color: "#16a34a",
                      fontSize: "11px",
                      fontWeight: 600,
                      background: "#eaf8ef"
                    }}
                  >
                    {s.delta}
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>


      {/* ── Featured Startups ── */}
      <Container fluid className="px-5 mb-5 mt-3">
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginBottom: "16px" }}
        >
          <div>
            <h2 className="fw-bold mb-2"> Featured Startups</h2>
            <p className="text-muted mb-0 mt-2" style={{ fontSize: 14 }}>Trending projects seeking funding and collaboration</p>
          </div>
          <Button variant="link" style={{ color: NAVY, fontWeight: 600 }} onClick={() => navigate("/ideas")}>
            View All →
          </Button>
        </div>

        <div
          className="bg-white rounded-4 border overflow-hidden"
          style={{ borderColor: "#e5e7eb" }}
        >
          <table className="table featured-table align-middle mb-0">
            <thead
              style={{
                background: "#f8fafc",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              <tr>
                <th className="ps-4">Startup & Industry</th>
                <th>Status</th>
                <th>Description</th>
                <th>Team & Funding</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {startups.slice(0, 3).map((startup) => (
                <FeaturedStartupRow
                  key={startup._id}
                  startup={{
                    ...startup,
                    name: startup.title,
                    badge: startup.category || 'Idea',
                    desc: startup.summary,
                    funding: startup.fundingGoal
                      ? `$${Number(startup.fundingGoal).toLocaleString()}`
                      : 'Not set',
                    team: `${startup.interestCount || 0} interested`,
                    progress: startup.fundingGoal && startup.fundingRaised
                      ? Math.min(100, Math.round((startup.fundingRaised / startup.fundingGoal) * 100))
                      : Math.min(100, startup.interestCount * 10) || 0,
                  }}
                  NAVY={NAVY}
                  navigate={navigate}
                  role={user?.role}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      {/* ── CTA Banner ── */}
      <div
        style={{
          background:
            "radial-gradient(circle at center, #06204a 0%, #041530 45%, #020817 100%)",
          position: "relative",
          overflow: "hidden",
          padding: "8rem 1.5rem",
          textAlign: "center",
        }}
      >
        {/* Circular rings */}
        <div
          style={{
            position: "absolute",
            width: "700px",
            height: "700px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "50%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "550px",
            height: "550px",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "50%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "50%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Blue glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background: "rgba(37,99,235,0.15)",
            filter: "blur(80px)",
            borderRadius: "50%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 className="fw-bold text-white mb-2">
            Ready to Build the Future?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "3rem" }}>
            Join thousands of entrepreneurs, investors, and innovators transforming ideas into reality
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            {user?.role === "entrepreneur" ? (
              <>
                <Button
                  style={{ background: "#fff", color: "#041530", border: "none", fontWeight: 700, padding: "12px 28px", borderRadius: "999px", boxShadow: "0 10px 30px rgba(37,99,235,.25)" }}
                  onClick={() => navigate("/create-idea")}
                >
                  Submit Your Project
                </Button>
                <Button
                  style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.25)", fontWeight: 700, padding: "12px 28px", borderRadius: "999px" }}
                  onClick={() => navigate("/ideas")}
                >
                  Explore Opportunities
                </Button>
              </>
            ) : (
              <Button
                style={{
                  background: "#fff",
                  color: "#041530",
                  border: "none",
                  fontWeight: 700,
                  padding: "18px 60px",
                  borderRadius: "999px",
                  boxShadow: "0 10px 30px rgba(37,99,235,.25)",
                  fontSize: "1.1rem",
                }}
                onClick={() => navigate("/ideas")}
              >
                Explore Opportunities
              </Button>
            )}
          </div>
        </div>

      </div>

      <Footer />

    </div>

  );
}