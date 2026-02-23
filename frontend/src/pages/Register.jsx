import React, { useState, useEffect } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("auth-mode");
    return () => document.body.classList.remove("auth-mode");
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError(null);

    try {
      await register({
        name,
        email,
        password,
        role: "USER",
      });

      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="auth-hero register-hero">


      {/* overlay */}
      <div className="auth-overlay" />

      {/* top right action */}
      <div className="auth-top-actions">
        <Link to="/login" className="ghost-btn">Login</Link>
      </div>

      {/* hero heading */}
      <div className="auth-hero-header">
        <h1 className="auth-main-title">
          Donate<span>Life</span>
        </h1>

        <svg
          className="auth-header-ecg"
          viewBox="0 0 600 100"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,50 80,50 100,20 120,80 140,50
                    220,50 240,30 260,70 280,50
                    360,50 380,25 400,75 420,50
                    600,50"
            fill="none"
          />
        </svg>
      </div>

      {/* register card */}
      <div className="auth-hero-card">
        <h2>Create Account</h2>

        <p className="auth-desc">
          Create your account to donate blood, request help,
          and be part of a life-saving community.
        </p>

        <form onSubmit={submit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />

          <button type="submit">Join Free</button>

          {error && <div className="auth-error">{error}</div>}
        </form>

        <div className="auth-link">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>

    </div>
  );
}
