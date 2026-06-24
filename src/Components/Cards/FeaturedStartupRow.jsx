import { Badge, Button, ProgressBar } from "react-bootstrap";

export default function FeaturedStartupRow({
  startup,
  NAVY,
  navigate,
}) {
  return (
    <tr>
      <td className="ps-4">
        <div className="d-flex align-items-center gap-3">
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: "#e9eff7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: NAVY,
            }}
          >
            {startup.name[0]}
          </div>

          <div>
            <div className="fw-bold">{startup.name}</div>
            <small className="text-primary">
              {startup.category}
            </small>
          </div>
        </div>
      </td>

      <td>
        <Badge
          bg=""
          style={{
            background:
              startup.badge === "Prototype"
                ? "#fef3c7"
                : startup.badge === "Idea"
                ? "#dbeafe"
                : "#dcfce7",
            color:
              startup.badge === "Prototype"
                ? "#b45309"
                : startup.badge === "Idea"
                ? "#2563eb"
                : "#16a34a",
            padding: "6px 10px",
            borderRadius: "999px",
          }}
        >
          {startup.badge.toUpperCase()}
        </Badge>
      </td>

      <td style={{ width: "35%" }}>
        <span className="text-secondary">
          {startup.desc}
        </span>
      </td>

      <td>
        <div>
          <strong>{startup.funding}</strong>
          <span className="text-muted ms-1">
            Target
          </span>
        </div>

        <small className="text-muted">
          {startup.team}
        </small>
      </td>

      <td style={{ minWidth: 140 }}>
        <ProgressBar
          now={startup.progress}
          style={{ height: 5 }}
          className="mb-1"
        />

        <small
          className="fw-semibold"
          style={{ color: NAVY }}
        >
          {startup.progress}%
        </small>
      </td>

      <td>
        <div className="d-flex align-items-center gap-3">
          <Button
            variant="link"
            className="p-0 text-decoration-none"
            style={{ color: NAVY }}
            onClick={() =>
              navigate(`/ideas/${startup.id}`)
            }
          >
            View
          </Button>

          <Button
            size="sm"
            style={{
              background: NAVY,
              border: "none",
              padding: "8px 20px",
            }}
          >
            Invest
          </Button>
        </div>
      </td>
    </tr>
  );
}