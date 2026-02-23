import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDonor } from "../services/donorService";

export default function BecomeDonor() {
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await createDonor({
        name,
        bloodType,
        city,
        phone,
        available: false,
      });

      alert("Donor request sent. Waiting for admin approval.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to register donor");
    }
  };

  const pillInputStyle = {
    height: 54,
    padding: "0 22px",
    borderRadius: 999,
    fontSize: 15,
    background: "rgba(255,255,255,0.14)",
    border: "1.5px solid rgba(255,255,255,0.45)",
    color: "#ffffff",
    outline: "none",
  };

  return (
    <div className="page-center">
      <div className="panel add-donor-card">
        {/* ===== HEADER ===== */}
        <div className="page-header compact">
          <div className="header-left">
            <button
              className="btn secondary"
              onClick={() => navigate("/dashboard")}
            >
              ← Back
            </button>
          </div>

          <h1>Become a Donor</h1>

          <div className="header-right" />
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={submit} className="donor-form">
          {/* INPUTS */}
          <div className="donor-grid">
            <input
              style={pillInputStyle}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              style={pillInputStyle}
              placeholder="Blood Group (A+, O−, …)"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              required
            />

            <input
              style={pillInputStyle}
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <input
              style={pillInputStyle}
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* ===== BUTTONS — SIDE BY SIDE ===== */}
          <div
            style={{
              marginTop: 36,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 18,
              flexWrap: "wrap", // mobile-safe
            }}
          >
            <button
              type="submit"
              className="btn primary"
              style={{
                padding: "14px 42px",
                borderRadius: 999,
                fontSize: 16,
                minWidth: 260,
              }}
            >
              Submit Donor Request
            </button>

            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "12px 30px",
                borderRadius: 999,
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
