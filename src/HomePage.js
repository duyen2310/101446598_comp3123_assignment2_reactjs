// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; 

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Navigate to login page
  };

  const handleSignup = () => {
    navigate('/signup'); // Navigate to signup page
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to Employee Management</h1>
        <p>Manage employees with ease. Login to access the dashboard or sign up to create a new account.</p>
        <div className="buttons">
          <button onClick={handleLogin} className="btn btn-login">Sign In</button>
          <button onClick={handleSignup} className="btn btn-signup">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
