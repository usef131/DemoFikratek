import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { Container, Row, Col, Button, Card, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import SecondNavbar from "../../Components/Common/SecondNavbar";
import Footer from "../../Components/Common/Footer";
import PageTransition from "../../Components/PageTransition";
import FeaturedStartupRow from "../../Components/Cards/FeaturedStartupRow";
import "./HomeTwo.css";

const NAVY = "#0f2744";

const STATS = [
  { value: "2,547", label: "Ideas Shared", delta: "+12.5%" },
  { value: "486", label: "Active Investors", delta: "+8.3%" },
  { value: "143", label: "Projects Funded", delta: "+15.7%" },
  { value: "1,089", label: "Collaborations", delta: "+20.1%" }
];

export default function HomePageTwo() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/api/ideas")
      .then(res => res.json())
      .then(data => {
        setStartups(data.ideas || data);
      });
  }, []);

  return (
    <div className="homepage">

      <SecondNavbar />

      {/* HERO */}
      <section className="hero">
        <PageTransition>
          <Container>
            <Row className="justify-content-center text-center">
              <Col lg={10}>

                <h1 className="hero-title">
                  Welcome to <span>Fikretak</span>
                </h1>

                <p className="hero-description">
                  The professional ecosystem where innovators find funding,
                  and the teams they need to scale. Connect with the right people
                  to turn your vision into reality.
                </p>

                <div className="d-flex justify-content-center flex-wrap gap-3 mt-5">

                  {
                    user?.role === "entrepreneur" ?

                      <>
                        <Button
                          className="main-btn primary-btn"
                          onClick={() => navigate("/create-idea")}
                        >
                          ⊕ Add Project
                        </Button>

                        <Button
                          className="main-btn white-btn"
                          onClick={() => navigate("/ideas")}
                        >
                          Browse Projects
                        </Button>

                        <Button
                          className="main-btn white-btn"
                          onClick={() => navigate("/mentors")}
                        >
                          Find Investors
                        </Button>


                      </>


                      :
                      <Button
                        className="main-btn primary-btn"
                        onClick={() => navigate("/ideas")}
                      >
                        Browse Projects
                      </Button>
                  }

                </div>

              </Col>

            </Row>

          </Container>

        </PageTransition>

      </section>

      {/* STATS */}
      <Container fluid className="stats">
        <Row>
          {
            STATS.map((s, index) => (

              <Col
                key={s.label}
                xs={6}
                lg={3}
                className="stat-box"
              >

                <div className="stat-label">
                  {s.label}
                </div>

                <div className="d-flex align-items-center gap-2">

                  <span className="stat-number">
                    {s.value}
                  </span>

                  <span className="growth">
                    {s.delta}
                  </span>

                </div>

              </Col>
            ))}

        </Row>

      </Container>

      {/* FEATURED */}
      <Container fluid className="px-5 mt-5 mb-5">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold">
              Featured Startups
            </h2>

            <p className="text-muted">
              Trending projects seeking funding and collaboration
            </p>

          </div>

          <Button
            variant="link"
            className="view-btn"
            onClick={() => navigate("/ideas")}
          >
            View All →
          </Button>

        </div>


        <Card className="featured-card">

          <Table
            responsive
            className="featured-table mb-0"
          >

            <thead>

              <tr>
                <th>Startup & Industry</th>
                <th>Status</th>
                <th>Description</th>
                <th>Team & Funding</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {
                startups.slice(0, 3).map(startup => (

                  <FeaturedStartupRow
                    key={startup._id}
                    startup={{

                      ...startup,

                      name: startup.title,
                      badge: startup.category || "Idea",
                      desc: startup.summary,
                      funding:
                        startup.fundingGoal
                          ?
                          `$${Number(startup.fundingGoal).toLocaleString()}`
                          :
                          "Not set",
                      team:
                        `${startup.interestCount || 0} interested`,
                      progress:
                        startup.fundingGoal && startup.fundingRaised
                          ?
                          Math.min(
                            100,
                            Math.round(
                              startup.fundingRaised /
                              startup.fundingGoal *
                              100
                            )
                          )
                          :
                          0
                    }}


                    NAVY={NAVY}
                    navigate={navigate}
                    role={user?.role}
                  />
                ))}

            </tbody>
          </Table>

        </Card>
      </Container>

      {/* CTA */}
      <section className="cta">
        <div className="rings"></div>
        <Container className="text-center position-relative">

          <h2 className="text-white fw-bold">
            Ready to Build the Future?
          </h2>

          <p style={{ color: "rgba(255,255,255,0.65)" }}>
            Join thousands of entrepreneurs, investors,
            and innovators transforming ideas into reality
          </p>

          <Button
            className="investor-btn"
            onClick={() => navigate("/ideas")}
          >
            Explore Opportunities
          </Button>

        </Container>
      </section>

      <Footer />
    </div>
  );
}