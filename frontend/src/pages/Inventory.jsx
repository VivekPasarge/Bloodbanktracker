import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInventory, deleteInventory } from "../services/inventoryService";
import { isAdmin } from "../services/authUtils";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const admin = isAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadInventory() {
      try {
        const res = await getInventory();
        const data = res?.data ?? res;
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load inventory", err);
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete inventory item?")) return;

    try {
      await deleteInventory(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed");
    }
  }

  return (
    <div>
      {/* ===== PAGE HEADER ===== */}
      <div className="page-header">
        <button
          className="btn secondary"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <h1 className="page-title">Inventory</h1>

        {/* keeps layout aligned */}
        <div className="actions" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="panel">
        {loading && <div className="footer-muted">Loading...</div>}

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Blood Type</th>
              <th>Units</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", opacity: 0.6 }}>
                  No inventory data
                </td>
              </tr>
            )}

            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.bloodType}</td>
                <td>{item.units}</td>
                <td>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn secondary"
                      onClick={() =>
                        alert(JSON.stringify(item, null, 2))
                      }
                    >
                      View
                    </button>

                    {admin && (
                      <button
                        className="btn danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
