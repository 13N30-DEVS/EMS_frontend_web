import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

interface SecurityContextProps {
  isAuthenticated: boolean;
  userRoles: string[];
  login: () => void;
  logout: () => void;
}

const SecurityContext = createContext<SecurityContextProps | undefined>(
  undefined
);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const login = useCallback(() => {
    setIsAuthenticated(true);
    setUserRoles(['user']); // Example role
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserRoles([]);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      userRoles,
      login,
      logout,
    }),
    [isAuthenticated, userRoles, login, logout]
  );

  return (
    <SecurityContext.Provider value={value}>
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
