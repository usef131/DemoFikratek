import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaEnvelope } from "react-icons/fa";

export default function InvestorCard({ investor }) {
  return (
    <Card
      className="h-100 border-0"
      style={{
        borderRadius: "20px",
        transition: "0.3s",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      }}
    >
      <Card.Body
        className="d-flex flex-column"
        style={{ padding: "1.5rem" }}
      >
        <div className="text-center mb-3">
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
              color: "#fff",
              fontSize: "30px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            {investor.name?.charAt(0).toUpperCase()}
          </div>

          <h5
            style={{
              marginTop: "15px",
              fontWeight: "700",
              color: "#1f2937",
            }}
          >
            {investor.name}
          </h5>

          <span
            style={{
              background: "#EEF2FF",
              color: "#4F46E5",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            Investor
          </span>
        </div>

        <p
          style={{
            color: "#6B7280",
            fontSize: "14px",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          {investor.bio ||
            "Experienced investor looking for innovative startup ideas."}
        </p>

        <div
          style={{
            color: "#6B7280",
            fontSize: "14px",
            marginBottom: "15px",
            wordBreak: "break-word",
          }}
        >
          <FaEnvelope style={{ marginRight: "8px" }} />
          {investor.email}
        </div>

        <Button
          style={{
            width: "100%",
            borderRadius: "30px",
            padding: "10px",
            fontWeight: "600",
            background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
            border: "none",
          }}
        >
          View Profile
        </Button>
      </Card.Body>
    </Card>
  );
}