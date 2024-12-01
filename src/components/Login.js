import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';  // Import login action
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();  // To dispatch actions
  const navigate = useNavigate();  // To navigate to different pages

  const [email, setEmail] = useState('');  // Controlled input for email
  const [password, setPassword] = useState('');  // Controlled input for password
  const [error, setError] = useState('');  // To handle error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form from refreshing the page

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      // Make API call for login
      const response = await axios.post('https://101446598-comp-3123-assignment1.vercel.app/api/v1/user/login', { email, password });

      if (response.data.status) {
        // Store the token in Redux
        dispatch(login(response.data.token));
        
        // Save token to localStorage as well
        localStorage.setItem('token', response.data.token);

        // Redirect to Employee List page
        navigate('/employees');
      } else {
        setError(response.data.message);  // Show error message from API response
      }
    } catch (err) {
      setError('Wrong email/password');
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error if any */}
      
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
  );
};

export default Login;
