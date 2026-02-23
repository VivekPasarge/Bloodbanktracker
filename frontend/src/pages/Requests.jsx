import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRequests, updateRequest, deleteRequest } from '../services/requestService';
import { isAdmin } from '../services/authUtils';

export default function Requests() {
  const [reqs, setReqs] = useState([]);
  const admin = isAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await getRequests();
      setReqs(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
    }
  }

  async function changeStatus(id, status) {
    try {
      await updateRequest(id, { status });
      setReqs(prev =>
        prev.map(r => (r.id === id ? { ...r, status } : r))
      );
    } catch {
      alert('Status update failed');
    }
  }

  async function remove(id) {
    if (!confirm('Delete request?')) return;
    await deleteRequest(id);
    setReqs(prev => prev.filter(r => r.id !== id));
  }

  return (
  <div>
    {/* ===== HEADER ===== */}
    <div className="page-header">
      <div className="header-left">
        <button
          className="btn secondary"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>

      <h1 className="page-title centered">Requests</h1>

      <div className="header-right">
        {!admin && (
          <button
            className="btn primary"
            onClick={() => navigate('/requests/new')}
          >
            + Add Request
          </button>
        )}
      </div>
    </div>

    {/* ===== TABLE ===== */}
    <div className="panel">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Blood</th>
            <th>Units</th>
            <th>Hospital</th>
            <th>Notes</th>
            <th>Status</th>
            {admin && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {reqs.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', opacity: 0.6 }}>
                No requests found
              </td>
            </tr>
          )}

          {reqs.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.bloodType}</td>
              <td>{r.units}</td>
              <td>{r.hospitalId ?? '—'}</td>
              <td>{r.notes ?? '—'}</td>
              <td>{r.status}</td>

              {admin && (
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn secondary"
                      onClick={() => changeStatus(r.id, 'OPEN')}
                    >
                      Open
                    </button>

                    <button
                      className="btn primary"
                      onClick={() => changeStatus(r.id, 'FULFILLED')}
                    >
                      Fulfill
                    </button>

                    <button
                      className="btn danger"
                      onClick={() => remove(r.id)}
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
  </div>
);

}
