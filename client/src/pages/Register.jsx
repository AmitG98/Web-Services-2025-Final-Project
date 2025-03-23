import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('registered'); // or 'admin'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/register', {
        email,
        phone,
        password,
        role,
      });
      console.log('User registered:', res.data);
      // תבצע הפניה ל-login
    } catch (error) {
      console.error(error);
      // טיפול בשגיאות 
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Enter phone number" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)} 
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="registered">Registered User</option>
        </select>
        
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;
