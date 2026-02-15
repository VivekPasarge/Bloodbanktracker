import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import { isAdmin } from "./services/authUtils";

import Donors from "./pages/Donors";
import Hospitals from "./pages/Hospitals";
import Inventory from "./pages/Inventory";
import Deliveries from "./pages/Deliveries";
import Requests from "./pages/Requests";
import Users from "./pages/Users";

export default function App() {
  return (
    <>
      <Header />

      <main className="app-root">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* COMMON HOME */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          {/* DASHBOARDS */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {isAdmin() ? <AdminDashboard /> : <UserDashboard />}
              </ProtectedRoute>
            }
          />

          {/* FEATURES */}
          <Route path="/donors" element={<ProtectedRoute><Donors /></ProtectedRoute>} />
          <Route path="/hospitals" element={<ProtectedRoute><Hospitals /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/deliveries" element={<ProtectedRoute><Deliveries /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  );
}
