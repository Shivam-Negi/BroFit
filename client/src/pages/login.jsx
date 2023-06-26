import React from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const loginUser = (e) => {
    e.preventDefault();
    axios.get('/login');
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
