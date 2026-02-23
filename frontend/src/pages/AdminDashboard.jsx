// src/pages/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import SystemPulse from "../components/SystemPulse";

export default function AdminDashboard() {
  // for now we hardcode ADMIN
  // later you can read this from auth / token
  const role = "ADMIN";

  return (
    <div className="admin-dashboard">

      {/* HEADER SECTION */}
      <div
        className="admin-header"
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* Admin-only ECG */}
        <SystemPulse role={role} />

        <h1 className="colorful-title">
          Welcome, Super Admin
        </h1>
      </div>

      {/* ADMIN CARDS (UNCHANGED) */}
      <div className="admin-cards">
        <Link to="/inventory" className="admin-card">
          Manage Inventory
        </Link>

        <Link to="/donors" className="admin-card">
          Manage Donors
        </Link>

        <Link to="/hospitals" className="admin-card">
          Manage Hospitals
        </Link>

        <Link to="/requests" className="admin-card">
          Manage Requests
        </Link>

        <Link to="/deliveries" className="admin-card">
          Manage Deliveries
        </Link>

        <Link to="/users" className="admin-card">
          Manage Users
        </Link>
      </div>

    </div>
  );
}
