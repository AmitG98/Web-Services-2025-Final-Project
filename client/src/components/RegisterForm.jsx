// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'Registered User',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // כאן תבוא שליחת הנתונים לשרת בעתיד
    console.log('Registering user:', formData);
    navigate('/login');
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password (min 8 chars, 1 letter & 1 number)"
        value={formData.password}
        onChange={handleChange}
        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Registered User">Registered User</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Register</button>
      <div className="register-links">
        <span onClick={() => navigate('/login')}>Already have an account? Log in</span>
        <span className="disabled-link">Need help?</span>
      </div>
    </form>
  );
};

export default RegisterForm;
