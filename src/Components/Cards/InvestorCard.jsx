import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaEnvelope, FaMapMarkerAlt, FaMoneyBillWave, FaBookmark, FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function InvestorCard({ investor }) {

    const navigate = useNavigate();
    const initials = investor.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <Card
            className="h-100 border-0"
            style={{
                borderRadius: "14px",
                border: "0.5px solid #e5e7eb",
                boxShadow: "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#AFA9EC";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(83,74,183,0.1)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            <Card.Body
                className="d-flex flex-column"
                style={{ padding: "1.25rem", gap: "14px" }}
            >
                {/* Top: avatar + name */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "#EEEDFE",
                            color: "#3C3489",
                            fontSize: "16px",
                            fontWeight: "600",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexShrink: 0,
                        }}
                    >
                        {initials}
                    </div>
                    <div>
                        <p
                            style={{
                                margin: 0,
                                fontWeight: "600",
                                fontSize: "15px",
                                color: "#1f2937",
                            }}
                        >
                            {investor.name}
                        </p>
                        <span
                            style={{
                                background: "#EEEDFE",
                                color: "#3C3489",
                                padding: "2px 10px",
                                borderRadius: "20px",
                                fontSize: "11px",
                                fontWeight: "600",
                            }}
                        >
                            Investor
                        </span>
                    </div>
                </div>

                {/* Bio */}
                <p
                    style={{
                        color: "#6B7280",
                        fontSize: "13px",
                        lineHeight: "1.55",
                        margin: 0,
                    }}
                >
                    {investor.bio ||
                        "Experienced investor looking for innovative startup ideas in the MENA region."}
                </p>

                {/* Sector tags */}
                {investor.sectors?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {investor.sectors.map((s) => (
                            <span
                                key={s}
                                style={{
                                    fontSize: "11px",
                                    padding: "3px 9px",
                                    borderRadius: "20px",
                                    border: "0.5px solid #d1d5db",
                                    color: "#6B7280",
                                    background: "#f9fafb",
                                }}
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                )}

                {/* Meta info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "13px",
                            color: "#6B7280",
                        }}
                    >
                        <FaEnvelope size={13} style={{ flexShrink: 0 }} />
                        <span style={{ wordBreak: "break-word" }}>{investor.email}</span>
                    </div>

                    {investor.ticketSize && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "13px",
                                color: "#6B7280",
                            }}
                        >
                            <FaMoneyBillWave size={13} style={{ flexShrink: 0 }} />
                            <span>{investor.ticketSize}</span>
                        </div>
                    )}

                    {investor.location && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "13px",
                                color: "#6B7280",
                            }}
                        >
                            <FaMapMarkerAlt size={13} style={{ flexShrink: 0 }} />
                            <span>{investor.location}</span>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <hr style={{ border: "none", borderTop: "0.5px solid #e5e7eb", margin: 0 }} />

                {/* Actions */}
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                        onClick= {() => navigate(`/ViewProfile/${investor._id}`)}
                        style={{
                            flex: 1,
                            borderRadius: "8px",
                            padding: "8px",
                            fontWeight: "600",
                            fontSize: "13px",
                            background: "#534AB7",
                            border: "none",
                        }}
                    >
                        View profile
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}