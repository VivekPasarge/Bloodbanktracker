import React from 'react'
import { Link } from 'react-router-dom'

export default function UserDashboard() {
  return (
    <div>
      <h1 className="colorful-title">Your Dashboard</h1>

      <div className="panel">
        <p className="footer-muted">
          You can request blood, donate, and track your activity here.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <Link to="/requests" className="btn">Request Blood</Link>
          <Link to="/donors" className="btn">Donate Blood</Link>
          <Link to="/deliveries" className="btn">Track Deliveries</Link>
        </div>
      </div>
    </div>
  )
}
