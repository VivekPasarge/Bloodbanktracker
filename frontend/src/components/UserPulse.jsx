import React from "react";
import "../systemPulse.css";

export default function UserPulse({ role }) {
  if (role !== "USER") return null;

  return (
    <div className="user-pulse">
      <svg
        viewBox="0 0 600 120"
        preserveAspectRatio="none"
        className="pulse-svg"
      >
        <path
          d="M0 60
             L120 60
             C140 60, 150 40, 165 60
             C180 80, 195 60, 220 60
             L600 60"
        />
      </svg>
    </div>
  );
}
