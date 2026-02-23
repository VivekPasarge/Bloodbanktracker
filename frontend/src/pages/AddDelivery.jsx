import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDelivery } from '../services/deliveryService';

export default function AddDelivery() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    contactName: '',
    contactPhone: '',
    pickupAddress: '',
    dropAddress: '',
  });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    await createDelivery(form);
    navigate('/deliveries');
  }

 return (
  <div className="page-container">
    <div className="panel" style={{ maxWidth: 720, margin: '0 auto' }}>
      {/* ===== HEADER ===== */}
      <div className="page-header" style={{ marginBottom: 24 }}>
        <div className="header-left">
          <button
            className="btn secondary"
            onClick={() => navigate('/deliveries')}
          >
            ← Back
          </button>
        </div>

        <h1 className="page-title centered">Add Delivery</h1>

        <div className="header-right" />
      </div>

      {/* ===== FORM ===== */}
      <form className="hospital-form" onSubmit={submit}>
        <div className="form-grid">
          <input
            name="contactName"
            placeholder="Contact Name"
            onChange={update}
            required
          />

          <input
            name="contactPhone"
            placeholder="Phone Number"
            onChange={update}
            required
          />

          <input
            name="pickupAddress"
            placeholder="Pickup Address"
            onChange={update}
            required
          />

          <input
            name="dropAddress"
            placeholder="Drop Address"
            onChange={update}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary">
            Create Delivery
          </button>

          <button
            type="button"
            className="btn secondary"
            onClick={() => navigate('/deliveries')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);

}
