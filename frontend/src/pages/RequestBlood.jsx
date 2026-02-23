import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../services/requestService";
import { getHospitals } from "../services/hospitalService";

export default function RequestBlood() {
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState("");
  const [notes, setNotes] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getHospitals();
        setHospitals(res.data || []);
      } catch (e) {
        console.error("Failed to load hospitals", e);
      }
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!hospitalId) {
      alert("Please select a hospital");
      return;
    }

    try {
      await createRequest({
        bloodType,
        units,
        notes,
        hospitalId: Number(hospitalId),
      });

      alert("Blood request submitted. Waiting for admin approval.");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to submit request");
    }
  };

  /* ===== PILL INPUT STYLE (LOCAL ONLY) ===== */
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

  /* ===== OPTION STYLE FIX ===== */
  const optionStyle = {
    backgroundColor: "#ffffff",
    color: "#111827",
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

          <h1>Request Blood</h1>

          <div className="header-right" />
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={submit} className="donor-form">
          <div className="donor-grid">
            <input
              style={pillInputStyle}
              placeholder="Blood Type (A+, O−, …)"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              required
            />

            <input
              style={pillInputStyle}
              placeholder="Units Required"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              required
            />

            {/* ✅ FIXED SELECT */}
            <select
              style={pillInputStyle}
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              required
            >
              <option value="" style={optionStyle}>
                Select Hospital
              </option>

              {hospitals.map((h) => (
                <option key={h.id} value={h.id} style={optionStyle}>
                  {h.name}
                </option>
              ))}
            </select>

            <input
              style={pillInputStyle}
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* ===== BUTTONS ===== */}
          <div
            style={{
              marginTop: 36,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 18,
              flexWrap: "wrap",
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
              Submit Request
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
