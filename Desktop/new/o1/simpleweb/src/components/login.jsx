import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/profiles');
      const data = await res.json();
      const profiles = Array.isArray(data) ? data : data.data;

      const matchedUser = profiles.find(
        (item) => item.email?.toLowerCase() === email.toLowerCase()
      );

      if (matchedUser) {
        localStorage.setItem('starUser', JSON.stringify(matchedUser));
        alert('Login Successful');
        navigate('/');
      } else {
        alert('Email not found, redirecting to Register');
        navigate('/register');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Login with Email</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
