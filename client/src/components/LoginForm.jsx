// src/components/LoginForm.jsx
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // כאן תבוא קריאה לשרת לבדיקת התחברות
    const mockToken = '1234567890'; // בעתיד יגיע מהשרת

    if (remember) {
      Cookies.set('authToken', mockToken, { expires: 1 / 24 }); // שעה
    } else {
      sessionStorage.setItem('authToken', mockToken);
    }

    navigate('/home'); // נניח שזה דף הבית
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-options">
        <label>
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember Me
        </label>
      </div>
      <button type="submit">Sign In</button>
      <div className="login-links">
        <span onClick={() => navigate('/register')}>Sign up now</span>
        <span className="disabled-link">Need help?</span>
      </div>
    </form>
  );
};

export default LoginForm;
