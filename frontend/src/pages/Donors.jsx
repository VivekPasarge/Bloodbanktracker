import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDonors, approveDonor, deleteDonor } from "../services/donorService";
import { isAdmin } from "../services/authUtils";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const admin = isAdmin();

  useEffect(() => {
    loadDonors();
  }, []);

  async function loadDonors() {
    try {
      const res = await getDonors();
      setDonors(res?.data ?? []);
    } catch (e) {
      console.error(e);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id) {
    await approveDonor(id);
    loadDonors();
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete donor?")) return;
    await deleteDonor(id);
    loadDonors();
  }

  if (loading) return <div className="panel">Loading donors…</div>;

  return (
    <div>
      {/* ✅ HEADER — SAME STYLE AS HOSPITALS */}
      <div className="page-header" style={{ marginBottom: 24 }}>
        <div className="header-left">
          <button
            className="btn secondary"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        <h1 className="page-title centered">Donors</h1>

        <div className="header-right">
          {admin && (
            <button
              className="btn primary"
              onClick={() => navigate("/donors/new")}
            >
              + Add Donor
            </button>
          )}
        </div>
      </div>

      {/* ===== CONTENT (UNCHANGED) ===== */}
      {donors.length === 0 && <div className="panel">No donors found</div>}

      {donors.map(d => (
        <div
          key={d.id}
          className="panel"
          style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>{d.name}</div>
            <div className="footer-muted">{d.phone}</div>
            <div className="footer-muted">
              {d.bloodType} • {d.city} • {d.status}
            </div>
          </div>

          {admin && (
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn secondary"
                onClick={() => alert(JSON.stringify(d, null, 2))}
              >
                View
              </button>

              {d.status === "PENDING" && (
                <button
                  className="btn primary"
                  onClick={() => handleApprove(d.id)}
                >
                  Approve
                </button>
              )}

              <button
                className="btn danger"
                onClick={() => handleDelete(d.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
