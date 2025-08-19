import { Box, CircularProgress } from '@mui/material';
import React, { lazy, Suspense, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuthStore } from '../../store/authStore';

// Lazy load components for better performance
const LoginForm = lazy(() => import('../Auth/LoginForm'));
const SignupForm = lazy(() => import('../Auth/SignUpForm'));
const ForgotPassword = lazy(() => import('../Auth/ForgotPassword'));
const AppLayout = lazy(() =>
  import('../Layout/AppLayout').then(module => ({ default: module.AppLayout }))
);

// Loading component for lazy-loaded routes
const RouteLoadingSpinner: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    <CircularProgress size={60} />
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ fontSize: '1.2rem', fontWeight: 500, color: '#666', mb: 1 }}>
        Loading...
      </Box>
      <Box sx={{ fontSize: '0.9rem', color: '#999' }}>
        Please wait while we prepare your experience
      </Box>
    </Box>
  </Box>
);

// Dashboard component with React.memo optimization
const Dashboard: React.FC<{ userName?: string }> = React.memo(
  ({ userName }) => (
    <Box sx={{ p: 3 }}>
      <h1>Welcome to Your EMS Application!</h1>
      {userName && <p>You are logged in as: {userName}</p>}
      <p>This is a production-ready React application with:</p>
      <ul>
        <li>React with TypeScript</li>
        <li>Material-UI for beautiful components</li>
        <li>Zustand for state management</li>
        <li>Axios for API calls with retry logic</li>
        <li>React-Toastify for notifications</li>
        <li>Comprehensive error handling</li>
        <li>Authentication system</li>
        <li>Responsive layout</li>
        <li>Lazy loading for better performance</li>
        <li>React.memo optimizations</li>
        <li>Proper route protection</li>
        <li>Enhanced user experience</li>
      </ul>
    </Box>
  )
);

Dashboard.displayName = 'Dashboard';

// Main router component with React.memo optimization
const AppRouter: React.FC = React.memo(() => {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  // Debug logging removed for production

  // Always call these hooks regardless of auth state to prevent hook count mismatches
  const publicRoutes = useMemo(
    () => [
      {
        path: '/',
        element: (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <h1>Welcome to EMS</h1>
            <p>This is the public home page</p>
            <p>
              Current auth state:{' '}
              {JSON.stringify({ isAuthenticated, isLoading })}
            </p>
          </Box>
        ),
      },
      {
        path: '/login',
        element: (
          <Box>
            {isAuthenticated ? (
              <Navigate to='/dashboard' replace />
            ) : (
              <Suspense fallback={<RouteLoadingSpinner />}>
                <LoginForm />
              </Suspense>
            )}
          </Box>
        ),
      },
      {
        path: '/signup',
        element: (
          <Box>
            {isAuthenticated ? (
              <Navigate to='/dashboard' replace />
            ) : (
              <Suspense fallback={<RouteLoadingSpinner />}>
                <SignupForm />
              </Suspense>
            )}
          </Box>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <Box>
            {isAuthenticated ? (
              <Navigate to='/dashboard' replace />
            ) : (
              <Suspense fallback={<RouteLoadingSpinner />}>
                <ForgotPassword />
              </Suspense>
            )}
          </Box>
        ),
      },
      {
        path: '/test',
        element: (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <h1>Test Route</h1>
            <p>If you can see this, routing is working!</p>
          </Box>
        ),
      },
    ],
    [isAuthenticated, isLoading]
  );

  const protectedRoutes = useMemo(
    () => [
      {
        path: '/dashboard',
        element: (
          <Box>
            {!isAuthenticated ? (
              <Navigate to='/login' replace />
            ) : (
              <Suspense fallback={<RouteLoadingSpinner />}>
                <AppLayout title='Dashboard'>
                  <Dashboard userName={user?.name} />
                </AppLayout>
              </Suspense>
            )}
          </Box>
        ),
      },
      {
        path: '/profile',
        element: (
          <Box>
            {!isAuthenticated ? (
              <Navigate to='/login' replace />
            ) : (
              <Suspense fallback={<RouteLoadingSpinner />}>
                <AppLayout title='Profile'>
                  <Box sx={{ p: 3 }}>
                    <h1>Profile Page</h1>
                    <p>User profile management will go here.</p>
                    {user?.name && <p>Welcome, {user.name}!</p>}
                  </Box>
                </AppLayout>
              </Suspense>
            )}
          </Box>
        ),
      },
      {
        path: '/settings',
        element: (
          <Box>
            {!isAuthenticated ? (
              <Navigate to='/login' replace />
            ) : (
              <Suspense fallback={<RouteLoadingSpinner />}>
                <AppLayout title='Settings'>
                  <Box sx={{ p: 3 }}>
                    <h1>Settings Page</h1>
                    <p>Application settings will go here.</p>
                  </Box>
                </AppLayout>
              </Suspense>
            )}
          </Box>
        ),
      },
    ],
    [isAuthenticated, user?.name]
  );

  // Memoize the current routes to prevent unnecessary re-renders
  const currentRoutes = useMemo(() => {
    if (isAuthenticated) {
      // User is authenticated - show protected routes
      return [
        ...protectedRoutes,
        // Catch-all route for authenticated users
        {
          path: '*',
          element: <Navigate to='/dashboard' replace />,
        },
      ];
    } else {
      // User is not authenticated - show public routes only
      return [
        ...publicRoutes,
        // Catch-all route for unauthenticated users
        {
          path: '*',
          element: <Navigate to='/' replace />,
        },
      ];
    }
  }, [isAuthenticated, protectedRoutes, publicRoutes]);

  // Show loading while auth state is being determined
  if (isLoading) {
    return <RouteLoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {currentRoutes.map((route, index) => (
          <Route
            key={`${route.path || index}`}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;
