import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../services/userService";
import { isAdmin } from "../services/authUtils";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const admin = isAdmin();

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await getUsers();
      setUsers(res?.data ?? []);
    } catch (e) {
      console.error(e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete user?")) return;

    try {
      await deleteUser(id);
      loadUsers();
    } catch (e) {
      alert("Delete failed. Admin permission required.");
      console.error(e);
    }
  }

  if (loading) return <div className="panel">Loading users…</div>;

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="header-left">
          <button
            className="btn secondary"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        <h1>Users</h1>

        <div className="header-right" />
      </div>

      {/* USERS LIST */}
      {users.map((u) => (
        <div
          key={u.id}
          className="panel"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>{u.name}</div>
            <div className="footer-muted">{u.email}</div>
            <div className="footer-muted">Role: {u.role}</div>
          </div>

          {admin && (
            <button
              className="btn danger"
              onClick={() => handleDelete(u.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
