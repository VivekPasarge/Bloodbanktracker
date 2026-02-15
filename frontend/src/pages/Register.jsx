import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    try {
      // 👇 always register as DONOR
      await register({ name, email, password, role: 'ROLE_DONOR' });
      navigate('/login');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed';
      setError(msg);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <div className="panel">
        <h2>Create your account</h2>

        <form
          onSubmit={submit}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full name"
            style={{ padding: 10 }}
            required
          />

          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            style={{ padding: 10 }}
            type="email"
            required
          />

          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            style={{ padding: 10 }}
            required
          />

          <button className="btn" type="submit">
            Join Free
          </button>

          {error && <div style={{ color: '#ff6b6b' }}>{error}</div>}
        </form>

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Link to="/login" style={{ color: '#60a5fa' }}>
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
