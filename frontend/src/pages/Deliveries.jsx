import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getDeliveries,
  updateDeliveryStatus,
  deleteDelivery
} from '../services/deliveryService';
import { isAdmin } from '../services/authUtils';

export default function Deliveries() {
  const [items, setItems] = useState(null);
  const navigate = useNavigate();
  const admin = isAdmin();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getDeliveries();
    setItems(res.data || []);
  }

  async function setStatus(id, status) {
    await updateDeliveryStatus(id, status);
    setItems(prev =>
      prev.map(d =>
        d.id === id ? { ...d, status } : d
      )
    );
  }

  async function remove(id) {
    if (!window.confirm('Delete delivery?')) return;
    await deleteDelivery(id);
    setItems(prev => prev.filter(d => d.id !== id));
  }

  if (items === null) {
    return <div className="panel">Loading deliveries…</div>;
  }

  return (
  <div>
    {/* ===== HEADER ===== */}
    <div className="page-header" style={{ marginBottom: 24 }}>
      <div className="header-left">
        <button
          className="btn secondary"
          onClick={() => navigate("/dashboard")}
        >
          ← Back
        </button>
      </div>

      <h1 className="page-title centered">Deliveries</h1>

      <div className="header-right">
        {admin && (
          <button
            className="btn primary"
            onClick={() => navigate("/deliveries/new")}
          >
            + Add Delivery
          </button>
        )}
      </div>
    </div>

    {/* ===== EMPTY STATE ===== */}
    {!items.length && (
      <div className="panel">No deliveries found</div>
    )}

    {/* ===== TABLE ===== */}
    {!!items.length && (
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Contact</th>
              <th>Phone</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Status</th>
              {admin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {items.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.contactName}</td>
                <td>{d.contactPhone}</td>
                <td>{d.pickupAddress}</td>
                <td>{d.dropAddress}</td>

                {/* STATUS */}
                <td>
                  <span className={`status-badge ${d.status}`}>
                    {d.status.replace("_", " ")}
                  </span>
                </td>

                {/* ACTIONS */}
                {admin && (
                  <td>
                    <div className="actions">
                      <button
                        className="btn secondary"
                        disabled={d.status === "IN_TRANSIT"}
                        onClick={() => setStatus(d.id, "IN_TRANSIT")}
                      >
                        In Transit
                      </button>

                      <button
                        className="btn primary"
                        disabled={d.status === "DELIVERED"}
                        onClick={() => setStatus(d.id, "DELIVERED")}
                      >
                        Delivered
                      </button>

                      <button
                        className="btn danger"
                        onClick={() => remove(d.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

}
