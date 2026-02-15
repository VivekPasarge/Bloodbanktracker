// src/components/Header.jsx
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'
import ThemeSwitcher from './ThemeSwitcher'
import { isAdmin } from '../services/authUtils'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const admin = isAdmin()
  const isLoggedIn = !!localStorage.getItem('token')

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header">
      {/* BRAND */}
      <div className="brand">
        <div
          className="logo"
          style={{
            fontSize: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          🩸
        </div>

        <div style={{ fontWeight: 700, fontSize: 18 }}>
          DonateLife
        </div>
      </div>

      {/* NAVIGATION */}
      {isLoggedIn && (
        <nav className="nav">
          {/* COMMON HOME */}
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Home
          </Link>

          {/* DASHBOARD (ROLE BASED) */}
          <Link
            to="/dashboard"
            className={isActive('/dashboard') ? 'active' : ''}
          >
            Dashboard
          </Link>

          {/* COMMON FEATURES */}
          <Link to="/donors" className={isActive('/donors') ? 'active' : ''}>
            Donors
          </Link>

          <Link
            to="/deliveries"
            className={isActive('/deliveries') ? 'active' : ''}
          >
            Deliveries
          </Link>

          <Link
            to="/requests"
            className={isActive('/requests') ? 'active' : ''}
          >
            Requests
          </Link>

          {/* ADMIN ONLY */}
          {admin && (
            <>
              <Link
                to="/inventory"
                className={isActive('/inventory') ? 'active' : ''}
              >
                Inventory
              </Link>

              <Link
                to="/users"
                className={isActive('/users') ? 'active' : ''}
              >
                Users
              </Link>
            </>
          )}
        </nav>
      )}

      {/* RIGHT ACTIONS */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <ThemeSwitcher />

        {!isLoggedIn ? (
          <>
            <Link to="/register" className="btn btn-secondary">
              Join Free
            </Link>
            <Link to="/login" className="btn">
              Login
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        )}
      </div>
    </header>
  )
}
