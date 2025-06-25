import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Placeholder for authentication hook
const useAuth = () => {
  // Replace with actual authentication logic
  const isAuthenticated = false;
  const userRoles: string[] = [];
  return { isAuthenticated, userRoles };
};

interface RoleBasedRouteProps {
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, userRoles } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const hasRole = allowedRoles.some(role => userRoles.includes(role));
  return hasRole ? <Outlet /> : <Navigate to="/forbidden" replace />;
};

export default RoleBasedRoute; 