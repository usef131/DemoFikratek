import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { Container, Row, Col, Button, Table, } from "react-bootstrap";
import SecondNavbar from "../../Components/Common/SecondNavbar";
import Footer from "../../Components/Common/Footer";
import FeaturedStartupRow from "../../Components/Cards/FeaturedStartupRow";
import "./HomeTwo.css";


const NAVY = "#0f2744";



// ── mock data ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2,547", label: "Ideas Shared", delta: "+12.5%" },
  { value: "486", label: "Active Investors", delta: "+8.3%" },
  { value: "143", label: "Projects Funded", delta: "+15.7%" },
  { value: "1,089", label: "Collaborations", delta: "+20.1%" },
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


// ── component ─────────────────────────────────────────────────────────────────
export default function HomePageTwo() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { user } = useAuth()

  return (
    <div style={{ background: "#f5f6f8", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>


      {/* ── Navbar ── */}
      <SecondNavbar />

      {/* ── Hero ── */}
      <div
        style={{
          background:
            "linear-gradient(180deg, #E6F0FF 0%, #F5F9FF 45%, #FFFFFF 100%)",
          paddingTop: "90px",
          paddingBottom: "120px",
        }}
      >
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
                <Button className="main-btn primary-btn" onClick={() => navigate("/create-idea")}>
                  ⊕ Add Project
                </Button>

                <Button className="main-btn white-btn" onClick={() => navigate("/ideas")}>
                  Browse Projects
                </Button>

                <Button className="main-btn white-btn" onClick={() => navigate("/mentors")}>
                  Find Investors
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
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
              {STARTUPS.map((startup) => (
                <FeaturedStartupRow
                  key={startup.id}
                  startup={startup}
                  NAVY={NAVY}
                  navigate={navigate}
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

          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              marginBottom: "3rem",
            }}
          >
            Join thousands of entrepreneurs, investors, and innovators transforming ideas into reality
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button
              style={{
                background: "#fff",
                color: "#041530",
                border: "none",
                fontWeight: 700,
                padding: "12px 28px",
                borderRadius: "999px",
                boxShadow: "0 10px 30px rgba(37,99,235,.25)",
              }}
              onClick={() => navigate("/create-idea")}
            >
              Submit Your Project
            </Button>

            <Button
              style={{
                background: "rgba(255,255,255,.12)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.25)",
                fontWeight: 700,
                padding: "12px 28px",
                borderRadius: "999px",
              }}
              onClick={() => navigate("/ideas")}
            >
              Explore Opportunities
            </Button>
          </div>
        </div>
      </div>

      <Footer />

    </div>

  );
}