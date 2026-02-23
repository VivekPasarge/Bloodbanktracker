import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
  getNearestHospitals,
} from "../services/hospitalService";
import { isAdmin } from "../services/authUtils";

export default function Hospitals() {
  const navigate = useNavigate();
  const location = useLocation();
  const admin = isAdmin();

  const [hospitals, setHospitals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  /* ===== FORM STATE ===== */
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const lat = params.get("lat");
    const lng = params.get("lng");
    const cityParam = params.get("city"); // 🔥 IMPORTANT

    if (lat && lng) {
      // 🔥 NEAREST HOSPITALS (CITY AWARE)
      getNearestHospitals(lat, lng, cityParam, 10).then((res) => {
        setHospitals(res?.data || []);
      });
    } else {
      // DEFAULT FLOW
      loadHospitals();
    }
  }, [location.search]);

  async function loadHospitals() {
    const res = await getHospitals();
    setHospitals(res?.data || []);
  }

  function resetForm() {
    setName("");
    setAddress("");
    setCity("");
    setPhone("");
    setLatitude("");
    setLongitude("");
    setEditId(null);
    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      address,
      city,
      phone,
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    if (editId) {
      await updateHospital(editId, payload);
    } else {
      await createHospital(payload);
    }

    resetForm();
    loadHospitals();
  }

  function startEdit(h) {
    setEditId(h.id);
    setName(h.name || "");
    setAddress(h.address || "");
    setCity(h.city || "");
    setPhone(h.phone || "");
    setLatitude(h.latitude || "");
    setLongitude(h.longitude || "");
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this hospital?")) return;
    await deleteHospital(id);
    setHospitals((prev) => prev.filter((h) => h.id !== id));
  }

  return (
    <div>
      {/* ===== HEADER ===== */}
      <div className="page-header">
        <button
          className="btn secondary"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <h1 className="page-title">Hospitals</h1>

        {admin ? (
          <button
            className="btn primary"
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancel" : "+ Add Hospital"}
          </button>
        ) : (
          <div style={{ width: 140 }} />
        )}
      </div>

      {/* ===== FORM ===== */}
      {admin && showForm && (
        <div className="panel" style={{ marginBottom: 24 }}>
          <form onSubmit={handleSubmit} className="hospital-form">
            <div className="form-grid">
              <input
                className="input-primary"
                placeholder="Hospital Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                className="input-contact"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <input
                className="input-contact"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />

              <input
                className="input-address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <input
                className="input-geo"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />

              <input
                className="input-geo"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <button className="btn primary">
                {editId ? "Update Hospital" : "Save Hospital"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===== TABLE ===== */}
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Phone</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Map</th>
              {admin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {hospitals.map((h) => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td>{h.name}</td>
                <td>{h.address}</td>
                <td>{h.city}</td>
                <td>{h.phone}</td>
                <td>{h.latitude}</td>
                <td>{h.longitude}</td>

                <td>
                  {h.latitude && h.longitude ? (
                    <a
                      className="map-link"
                      href={`https://www.openstreetmap.org/?mlat=${h.latitude}&mlon=${h.longitude}#map=17/${h.latitude}/${h.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>

                {admin && (
                  <td style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn primary"
                      onClick={() => startEdit(h)}
                    >
                      Update
                    </button>
                    <button
                      className="btn danger"
                      onClick={() => handleDelete(h.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}