
import { FiHome, FiCompass, FiGift, FiUser, FiLogOut } from "react-icons/fi";
import logo from "../../assets/images/logo.png";
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
    const { user } = useAuth();

    return (
        <Navbar
            bg="white"
            expand="lg"
            className="shadow-sm border-bottom py-2 sticky-top"
        >
            <Container fluid="lg">

                {/* LOGO */}
                <Navbar.Brand
                    onClick={() => navigate("/")}
                    className="navbar-brand-custom"
                >
                    <img
                        src={logo}
                        alt="logo"
                        style={{ width: "36px", height: "36px" }}
                    />
                    Fikretak
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>

                    {/* NAV LINKS */}
                    <Nav className="mx-auto gap-1 align-items-center">

                        <NavLink to="/Home-Two" className="nav-link-custom">
                            <FiHome size={17} />
                            Home
                        </NavLink>

                        <NavLink to="/browse-projects" className="nav-link-custom">
                            <FiCompass size={17} />
                            Projects
                        </NavLink>

                        <NavLink to="/investor" className="nav-link-custom">
                            <FiGift size={17} />
                            Investors
                        </NavLink>

                        <NavLink to="/profile" className="nav-link-custom">
                            <FiUser size={17} />
                            Profile
                        </NavLink>

                    </Nav>

                    {/* RIGHT SIDE */}
                    <div className="d-flex align-items-center gap-3 ms-lg-3">

                        <Link to="/profile" className="nav-avatar">
                            {user?.name?.slice(0, 2).toUpperCase() || "U"}
                        </Link>

                        <button
                            className="nav-logout-btn"
                            onClick={() => navigate("/login")}
                        >
                            <FiLogOut size={18} color="#dc3545" />
                        </button>

                    </div>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SecondNavbar;