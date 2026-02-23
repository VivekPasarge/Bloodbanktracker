import React from "react";

export default function MlRiskCard({ data }) {
  if (!data) return null;

  const { risk, predictedDaysLeft } = data;

  const color =
    risk === "CRITICAL"
      ? "#ef4444"
      : risk === "WARNING"
      ? "#f59e0b"
      : "#22c55e";

  const message =
    risk === "CRITICAL"
      ? "Low blood supply detected. Urgent donations needed."
      : risk === "WARNING"
      ? "Blood stock is decreasing. Plan donations soon."
      : "Blood stock levels are stable.";

  return (
    <div
      className="card-small"
      style={{
        borderLeft: `6px solid ${color}`
      }}
    >
      <h3 style={{ marginBottom: 6 }}>
        🤖 ML Stock Risk
      </h3>

      <div
        style={{
          fontWeight: 700,
          color,
          marginBottom: 6
        }}
      >
        {risk}
      </div>

      <p style={{ marginBottom: 10 }}>
        {message}
      </p>

      <div className="footer-muted">
        Predicted days left:{" "}
        <strong>{predictedDaysLeft}</strong>
      </div>
    </div>
  );
}
