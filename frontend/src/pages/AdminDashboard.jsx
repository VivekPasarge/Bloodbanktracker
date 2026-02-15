import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1 className="colorful-title">Admin Dashboard</h1>

      <p className="admin-subtext">
        Welcome, Admin 👋  
        Manage inventory, donors, requests, deliveries, and users from here.
      </p>

      <div className="admin-cards">
        <Link to="/inventory" className="admin-card">Manage Inventory</Link>
        <Link to="/donors" className="admin-card">Manage Donors</Link>
        <Link to="/requests" className="admin-card">Manage Requests</Link>
        <Link to="/deliveries" className="admin-card">Manage Deliveries</Link>
        <Link to="/users" className="admin-card admin-card-center">Manage Users</Link>
      </div>
    </div>
  )
}
