import { useEffect, useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import InvestorCard from "../../Components/cards/InvestorCard";
import axios from "axios";
import SecondNavbar from "../../Components/Common/SecondNavbar";
import { useAuth } from '../../../Context/AuthContext'
const ALL_SECTORS = ["All", "Fintech", "EdTech", "AgriTech", "HealthTech", "CleanEnergy", "E-commerce", "Logistics"];

export default function Investors() {
    const { user: currentUser } = useAuth()
    const [investors, setInvestors] = useState([]);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInvestors();
    }, []);

    const fetchInvestors = async () => {
        try {
            const res = await axios.get("/api/users/investors");
          setInvestors(res.data.investors.filter(inv => inv._id !== currentUser?._id));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = useMemo(() => {
        return investors.filter((inv) => {
            const matchesSearch =
                search.trim() === "" ||
                inv.name?.toLowerCase().includes(search.toLowerCase()) ||
                inv.bio?.toLowerCase().includes(search.toLowerCase()) ||
                inv.sectors?.some((s) => s.toLowerCase().includes(search.toLowerCase()));

            const matchesSector =
                activeFilter === "All" ||
                inv.sectors?.includes(activeFilter);

            return matchesSearch && matchesSector;
        });
    }, [investors, search, activeFilter]);

    // Count unique sectors across all investors
    const sectorCount = useMemo(() => {
        const all = investors.flatMap((inv) => inv.sectors || []);
        return new Set(all).size;
    }, [investors]);

    return (
        <>
            <SecondNavbar />

            <Container className="py-4" style={{ maxWidth: "1100px" }}>

                {/* Page header */}
                <div style={{ marginBottom: "1.5rem" }}>
                    <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#1f2937", marginBottom: "4px" }}>
                        Investors
                    </h1>
                    <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
                        Connect with investors who believe in Egyptian entrepreneurship
                    </p>
                </div>

 

                {/* Search + sector filters */}
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        marginBottom: "1.5rem",
                        alignItems: "center",
                    }}
                >
                    {/* Search input */}
                    <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
                        <FaSearch
                            size={13}
                            style={{
                                position: "absolute",
                                left: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#9CA3AF",
                                pointerEvents: "none",
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search by name or sector…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "9px 12px 9px 34px",
                                fontSize: "14px",
                                border: "0.5px solid #d1d5db",
                                borderRadius: "8px",
                                outline: "none",
                                color: "#1f2937",
                                background: "#fff",
                            }}
                        />
                    </div>

                    {/* Sector pills */}
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {ALL_SECTORS.map((sector) => (
                            <button
                                key={sector}
                                onClick={() => setActiveFilter(sector)}
                                style={{
                                    padding: "7px 14px",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    borderRadius: "20px",
                                    border: "0.5px solid",
                                    cursor: "pointer",
                                    transition: "all 0.15s",
                                    ...(activeFilter === sector
                                        ? {
                                            background: "#EEEDFE",
                                            borderColor: "#AFA9EC",
                                            color: "#3C3489",
                                        }
                                        : {
                                            background: "#fff",
                                            borderColor: "#d1d5db",
                                            color: "#6B7280",
                                        }),
                                }}
                            >
                                {sector}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards grid */}
                {loading ? (
                    <p style={{ color: "#9CA3AF", fontSize: "14px", textAlign: "center", padding: "3rem 0" }}>
                        Loading investors…
                    </p>
                ) : filtered.length === 0 ? (
                    /* Empty state */
                    <div
                        style={{
                            textAlign: "center",
                            padding: "4rem 1rem",
                            border: "0.5px dashed #d1d5db",
                            borderRadius: "14px",
                            background: "#fafafa",
                        }}
                    >
                        <FaSearch size={28} style={{ color: "#d1d5db", marginBottom: "12px" }} />
                        <p style={{ fontSize: "15px", color: "#6B7280", fontWeight: "600", marginBottom: "4px" }}>
                            No investors found
                        </p>
                        <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
                            Try a different search term or adjust your sector filter.
                        </p>
                        <button
                            onClick={() => { setSearch(""); setActiveFilter("All"); }}
                            style={{
                                marginTop: "12px",
                                padding: "8px 18px",
                                fontSize: "13px",
                                fontWeight: "600",
                                borderRadius: "8px",
                                border: "0.5px solid #d1d5db",
                                background: "#fff",
                                cursor: "pointer",
                                color: "#374151",
                            }}
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <Row className="g-4">
                        {filtered.map((investor) => (
                            <Col md={4} key={investor._id}>
                                <InvestorCard investor={investor} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
}