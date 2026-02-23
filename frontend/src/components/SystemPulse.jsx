import React from "react";
import "../systemPulse.css";

export default function SystemPulse({ role }) {
  // ADMIN ONLY
  if (role !== "ADMIN") return null;

  return (
    <div className="system-pulse">
      <svg
        viewBox="0 0 600 120"
        preserveAspectRatio="none"
        className="pulse-svg"
      >
        <path
          d="
            M0 60
            L90 60
            C100 60, 105 45, 112 60
            C118 80, 125 60, 150 60
            L220 60
            C235 60, 240 35, 250 60
            C260 90, 270 60, 290 60
            L600 60
          "
        />
      </svg>
    </div>
  );
}
