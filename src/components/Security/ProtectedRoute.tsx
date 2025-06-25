import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Placeholder for authentication hook
const useAuth = () => {
  // Replace with actual authentication logic
  const isAuthenticated = false;
  return { isAuthenticated };
};

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 