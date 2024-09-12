import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ element }) => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  return isLoggedIn ? element : <Navigate to="/" />;
};

export default ProtectedRoutes;
