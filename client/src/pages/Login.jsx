import React from 'react';
import LoginLayout from '../components/Login/LoginLayout';
import LoginForm from '../components/Login/LoginForm';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const Login = () => {
  return (
    <>
      <LoginLayout>
        <LoginForm />

        <div className="login-footer-text">
          <span className="login-muted">New to Netflix? </span>
          <Link to="/signup" className="login-link">Sign up now</Link>
        </div>

        <p className="login-recaptcha">
          This page is protected by Google reCAPTCHA to ensure you're not a robot.{' '}
          <a href="/" className="login-link">Learn more</a>
        </p>
      </LoginLayout>
      <Footer />
    </>
  );
};

export default Login;

<style>
{`
  .login-footer-text {
    text-align: center;
    margin-top: 1rem;
    color: white;
    font-size: 0.875rem;
  }
  .login-muted {
    color: #d1d5db;
  }
  .login-link {
    color: #60a5fa;
    font-weight: 600;
  }
  .login-recaptcha {
    color: #9ca3af;
    font-size: 0.75rem;
    margin-top: 2rem;
    text-align: center;
  }
`}
</style>
