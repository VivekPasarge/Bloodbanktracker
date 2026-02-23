import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/authService";
import "../auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.classList.add("auth-mode");
    return () => document.body.classList.remove("auth-mode");
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await login({ email, password });
      const { token, role, id, name } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      localStorage.setItem("name", name);

      window.location.replace("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-hero">

      <div className="auth-overlay" />

      <div className="auth-top-actions">
        <Link to="/register" className="ghost-btn">Register</Link>
      </div>

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

      <div className="auth-hero-card">
        <h2>Login</h2>

        <p className="auth-desc">
          Welcome back. Log in to find donors, request blood,
          and respond when someone needs help.
        </p>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          {error && <div className="auth-error">{error}</div>}
        </form>

        <div className="auth-link">
          <Link to="/register">Don’t have an account? Register</Link>
        </div>
      </div>

    </div>
  );
}
