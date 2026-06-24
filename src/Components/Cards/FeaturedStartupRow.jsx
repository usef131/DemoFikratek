import { Badge, Button, ProgressBar } from "react-bootstrap";

const CATEGORY_COLORS = {
    Tech: { bg: '#dbeafe', color: '#2563eb' },
    Health: { bg: '#dcfce7', color: '#16a34a' },
    Education: { bg: '#fef3c7', color: '#b45309' },
    Finance: { bg: '#ede9fe', color: '#7c3aed' },
    Environment: { bg: '#d1fae5', color: '#065f46' },
    Social: { bg: '#fee2e2', color: '#dc2626' },
    Other: { bg: '#f3f4f6', color: '#6b7280' },
}

export default function FeaturedStartupRow({ startup, NAVY, navigate, role }) {

    const colors = CATEGORY_COLORS[startup.badge] || CATEGORY_COLORS.Other

    return (
        <tr>
            <td className="ps-4">
                <div className="d-flex align-items-center gap-3">
                    <div style={{
                        width: 42, height: 42, borderRadius: 10,
                        background: "#e9eff7", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontWeight: 700, color: NAVY,
                    }}>
                        {startup.name?.[0]}
                    </div>
                    <div>
                        <div className="fw-bold">{startup.name}</div>
                        <small className="text-primary">{startup.category}</small>
                    </div>
                </div>
            </td>

            <td>
                <Badge bg="" style={{
                    background: colors.bg,
                    color: colors.color,
                    padding: '6px 10px',
                    borderRadius: '999px',
                }}>
                    {startup.badge}
                </Badge>
            </td>

            <td style={{ width: "35%" }}>
                <span className="text-secondary">{startup.desc}</span>
            </td>

            <td>
                <div>
                    <strong>{startup.funding}</strong>
                    <span className="text-muted ms-1">Target</span>
                </div>
                <small className="text-muted">{startup.team}</small>
            </td>

            <td style={{ minWidth: 140 }}>
                <ProgressBar now={startup.progress} style={{ height: 5 }} className="mb-1" />
                <small className="fw-semibold" style={{ color: NAVY }}>{startup.progress}%</small>
            </td>

            <td>
                {role === "entrepreneur" ? (
                    <div className="d-flex justify-content-center">
                        <Button
                            size="sm"
                            style={{
                                background: "#2563eb",
                                border: "none",
                                padding: "8px 24px",
                                borderRadius: "999px",
                            }}
                            onClick={() => navigate(`/browse-projects/${startup._id}`)}
                        >
                            View
                        </Button>
                    </div>
                ) : (
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <Button
                            size="sm"
                            style={{
                                background: "#2563eb",
                                border: "none",
                                padding: "8px 24px",
                                borderRadius: "999px",
                            }}
                            onClick={() => navigate(`/browse-projects/${startup._id}`)}
                        >
                            View
                        </Button>
                        <Button
                            size="sm"
                            style={{
                                background: NAVY,
                                border: "none",
                                padding: "8px 20px",
                                borderRadius: "999px",
                            }}
                        >
                            Invest
                        </Button>
                    </div>
                )}
            </td>
        </tr>
    )
}