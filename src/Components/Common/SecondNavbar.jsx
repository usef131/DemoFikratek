import {Navbar, Nav, Container} from "react-bootstrap";
import {FiHome, FiCompass, FiGift, FiAward, FiUser, FiLogOut} from "react-icons/fi";
import {useNavigate, Link} from "react-router-dom";
import {useAuth} from "../../../Context/AuthContext";
function SecondNavbar() {
    const navigate = useNavigate();
     const { user} = useAuth()
    return (
        <>
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
        </>
    );
}

export default SecondNavbar;