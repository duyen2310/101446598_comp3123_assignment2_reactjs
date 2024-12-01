import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';  // Import login action
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      
      <form >
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
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default Login;
