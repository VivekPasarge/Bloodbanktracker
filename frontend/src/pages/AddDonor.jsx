import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDonor } from "../services/donorService";

export default function AddDonor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    bloodType: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await createDonor(form);
      alert("Donor added successfully");
      navigate("/donors");
    } catch {
      alert("Failed to add donor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-center">
      <div className="panel add-donor-card">
        {/* ===== HEADER ===== */}
        <div className="page-header compact">
          <button
            className="btn secondary"
            onClick={() => navigate("/donors")}
          >
            ← Back
          </button>

          <h1>Add Donor</h1>

          <div />
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className="donor-form">
          <div className="donor-grid">
            <input
              name="name"
              placeholder="     Full Name"
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="     Phone Number"
              onChange={handleChange}
              required
            />

            <input
              name="bloodType"
              placeholder="     Blood Group (A+, O−, …)"
              onChange={handleChange}
              required
            />

            <input
              name="city"
              placeholder="      City"
              onChange={handleChange}
              required
            />
          </div>

          <div className="donor-actions">
            <button
              type="submit"
              className="btn primary"
              disabled={loading}
            >
              {loading ? "Saving…" : "Save Donor"}
            </button>

            <button
              type="button"
              className="btn secondary"
              onClick={() => navigate("/donors")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
