import { FiHome, FiCompass, FiGift, FiAward, FiUser, FiLogOut } from "react-icons/fi";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import Button from "react-bootstrap/Button";


const navStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    borderRadius: "999px",
    color: isActive ? "#0d6efd" : "#6c757d",
    border: isActive ? "2px solid #0d6efd" : "2px solid transparent",
    backgroundColor: isActive
      ? "rgba(13,110,253,0.08)"
      : "transparent",
    fontWeight: isActive ? "600" : "500",
    textDecoration: "none",
    transition: "all 0.25s ease",
    "&:hover": {
      backgroundColor: isActive ? "rgba(13,110,253,0.08)" : "rgba(0,0,0,0.04)",
    },
  });

function SecondNavbar() {
    const navigate = useNavigate();
    const { user } = useAuth()
    return (
        <>
            <Navbar
                bg="white"
                expand="lg"
                className="shadow-sm border-bottom py-2 sticky-top"
            >
                <Container fluid="lg">
                    {/* Logo */}
                    <Navbar.Brand
                        onClick={() => navigate("/")}
                        className="fw-bold fs-2"
                        style={{
                            cursor: "pointer",
                            color: "#212529",
                            letterSpacing: "-1px",
                        }}
                    >
                        Fikretak
                    </Navbar.Brand>

                    {/* Mobile Toggle */}
                    <Navbar.Toggle aria-controls="main-navbar" />

                    <Navbar.Collapse id="main-navbar">
                        {/* Navigation */}
                        <Nav className="mx-auto gap-lg-2 align-items-lg-center my-3 my-lg-0">
                            <NavLink to="/Home-Two" style={navStyle}>
                                <FiHome size={18} />
                                Home
                            </NavLink>

                            <NavLink to="/marketplace" style={navStyle}>
                                <FiCompass size={18} />
                                Browse Projects
                            </NavLink>

                            <NavLink to="/collaborate" style={navStyle}>
                                <FiGift size={18} />
                                Investors
                            </NavLink>
                            
                            <NavLink to="/profile" style={navStyle}>
                                <FiUser size={18} />
                                Profile
                            </NavLink>
                        </Nav>

                        {/* Right Side */}
                        <div className="d-flex align-items-center gap-3 ms-lg-3">
                            {/* Profile Avatar */}
                            <Link
                                to="/profile"
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "50%",
                                    background:
                                        "linear-gradient(135deg, #0d6efd, #4f8cff)",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    textDecoration: "none",
                                    boxShadow: "0 4px 12px rgba(13,110,253,0.25)",
                                    transition: "0.3s",
                                }}
                            >
                                {user?.name?.slice(0, 2).toUpperCase() || "U"}
                            </Link>

                            {/* Logout Button */}
                            <Button
                                variant="light"
                                onClick={() => navigate("/login")}
                                style={{
                                    borderRadius: "12px",
                                    width: "42px",
                                    height: "42px",
                                    padding: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid #dee2e6",
                                    transition: "all 0.25s ease",
                                }}
                            >
                                <FiLogOut size={18} color="#dc3545" />
                            </Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default SecondNavbar;