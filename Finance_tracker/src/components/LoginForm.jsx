import { useState } from 'react';
import api from '../api';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/login', { email, password });
      onLogin();
    } catch (err) {
      alert('Invalid credentials', err);
    }
  };

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}
