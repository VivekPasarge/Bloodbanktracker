import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import Donors from './pages/Donors';
import AddDonor from './pages/AddDonor';
import BecomeDonor from './pages/BecomeDonor';

import Users from './pages/Users';
import Hospitals from './pages/Hospitals';

import Deliveries from './pages/Deliveries';
import AddDelivery from './pages/AddDelivery';

import Requests from './pages/Requests';
import RequestBlood from './pages/RequestBlood';

import Inventory from './pages/Inventory';

import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

import { isAdmin } from './services/authUtils';

export default function App() {
  return (
    <>
      <Header />

      <main className="app-root">
        <Routes>

          {/* ===== PUBLIC ===== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ===== HOME ===== */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* ===== DASHBOARD ===== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {isAdmin() ? <AdminDashboard /> : <UserDashboard />}
              </ProtectedRoute>
            }
          />

          {/* ===== USER: BECOME DONOR (🔥 FIX) ===== */}
          <Route
            path="/become-donor"
            element={
              <ProtectedRoute>
                <BecomeDonor />
              </ProtectedRoute>
            }
          />

          {/* ===== DONORS (ADMIN) ===== */}
          <Route
            path="/donors"
            element={
              <ProtectedRoute>
                <Donors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donors/new"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AddDonor />
                </AdminRoute>
              </ProtectedRoute>
            }
          />

          {/* ===== HOSPITALS ===== */}
          <Route
            path="/hospitals"
            element={
              <ProtectedRoute>
                <Hospitals />
              </ProtectedRoute>
            }
          />

          {/* ===== DELIVERIES ===== */}
          <Route
            path="/deliveries"
            element={
              <ProtectedRoute>
                <Deliveries />
              </ProtectedRoute>
            }
          />

          <Route
            path="/deliveries/new"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AddDelivery />
                </AdminRoute>
              </ProtectedRoute>
            }
          />

          {/* ===== REQUESTS ===== */}
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/requests/new"
            element={
              <ProtectedRoute>
                <RequestBlood />
              </ProtectedRoute>
            }
          />

          {/* ===== INVENTORY ===== */}
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />

          {/* ===== USERS (ADMIN) ===== */}
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Users />
                </AdminRoute>
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>
    </>
  );
}
