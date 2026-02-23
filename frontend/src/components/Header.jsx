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

  // ❌ Hide header completely on auth pages
  if (
    location.pathname === '/login' ||
    location.pathname === '/register'
  ) {
    return null
  }

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header">
      {/* BRAND */}
      <div className="brand">
        <div className="logo">🩸</div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>
          DonateLife
        </div>
      </div>

      {/* NAV */}
      {isLoggedIn && (
        <nav className="nav">
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Home
          </Link>

          <Link
            to="/dashboard"
            className={isActive('/dashboard') ? 'active' : ''}
          >
            Dashboard
          </Link>

          <Link to="/donors" className={isActive('/donors') ? 'active' : ''}>
            Donors
          </Link>

          <Link
            to="/hospitals"
            className={isActive('/hospitals') ? 'active' : ''}
          >
            Hospitals
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

      {/* RIGHT */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {isLoggedIn && <ThemeSwitcher />}

        {isLoggedIn && (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        )}
      </div>
    </header>
  )
}
