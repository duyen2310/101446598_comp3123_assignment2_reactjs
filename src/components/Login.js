// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';  // Import login action
import { useNavigate } from 'react-router-dom';
import './style/Login.css'; 

const Login = () => {
  const dispatch = useDispatch();  
  const navigate = useNavigate();  

  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      // Make API call for login
      const response = await axios.post('https://101446598-comp-3123-assignment1.vercel.app/api/v1/user/login', { email, password });

      if (response.data.status) {
        dispatch(login(response.data.token));
        
        localStorage.setItem('token', response.data.token);

        navigate('/employees');
      } else {
        setError(response.data.message);  
      }
    } catch (err) {
      setError('Wrong email/password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} 
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
