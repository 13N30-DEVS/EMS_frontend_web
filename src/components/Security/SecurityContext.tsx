import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SecurityContextProps {
  isAuthenticated: boolean;
  userRoles: string[];
  login: () => void;
  logout: () => void;
}

const SecurityContext = createContext<SecurityContextProps | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const login = () => {
    setIsAuthenticated(true);
    setUserRoles(['user']); // Example role
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRoles([]);
  };

  return (
    <SecurityContext.Provider value={{ isAuthenticated, userRoles, login, logout }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}; 