import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await login({ email, password });
      // backend could return token in different shapes: { token }, { accessToken }, or raw string
      const { token, role } = res.data || {};
if (token) {
  localStorage.setItem('token', token);
}
if (role) {
  localStorage.setItem('role', role);
}

      // if user was trying to open protected route, go back
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      // try to show backend message if present
      const msg = err?.response?.data?.message || 'Login failed';
      setError(msg);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <div className="panel">
        <h2>Login</h2>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ padding: 10 }} />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" style={{ padding: 10 }} />
          <button className="btn" type="submit">Login</button>
          {error && <div style={{ color: '#ff6b6b' }}>{error}</div>}
        </form>

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Link to="/register" style={{ color: '#60a5fa' }}>
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
