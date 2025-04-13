import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserLogin } from '../hooks/useUserLogin';
import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const { mutate: loginUser, isLoading } = useUserLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser({
      username: email,
      password: password,
      rememberMe: remember,
    });
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
      <div className="login-links">
        <span onClick={() => navigate('/register')}>Sign up now</span>
        <span className="disabled-link">Need help?</span>
      </div>
    </form>
  );
};

export default LoginForm;
