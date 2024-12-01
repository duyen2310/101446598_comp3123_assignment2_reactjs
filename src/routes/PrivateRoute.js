// src/routed/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);  // Get token from Redux

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  return children;  // Allow access to the child component
};

export default PrivateRoute;
