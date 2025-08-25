import { Box, CircularProgress } from '@mui/material';
import React, { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuthStore } from '../../store/authStore';

const LoginForm = lazy(() => import('../Auth/LoginForm'));
const SignupFlow = lazy(() => import('../Auth/SignupFlow'));
const SignUpForm = lazy(() => import('../Auth/SignUpForm'));
const WorkspaceSetup = lazy(() => import('../Auth/Workspace'));
const SetupWizard = lazy(() => import('../Workspace/SetupWizard'));
const ForgotPassword = lazy(() => import('../Auth/ForgotPassword'));
const AppLayout = lazy(() =>
  import('../Layout/AppLayout').then(module => ({ default: module.AppLayout }))
);
const Dashboard = lazy(() => import('../Dashboard/Dashboard'));

const RouteLoadingSpinner = () => (
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

const AppRouter = () => {
  const { isAuthenticated, user } = useAuthStore();

  // Memoize public and onboarding routes
  const publicRoutes = useMemo(
    () => (
      <>
        <Route
          path='/login'
          element={
            <Suspense fallback={<RouteLoadingSpinner />}>
              <LoginForm />
            </Suspense>
          }
        />
        <Route
          path='/signup'
          element={
            <Suspense fallback={<RouteLoadingSpinner />}>
              <SignupFlow />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<RouteLoadingSpinner />}>
                <SignUpForm />
              </Suspense>
            }
          />
          <Route
            path='workspace'
            element={
              <Suspense fallback={<RouteLoadingSpinner />}>
                <WorkspaceSetup />
              </Suspense>
            }
          />
          {/* Onboarding steps: route each step to SetupWizard */}
          <Route
            path='department'
            element={
              <Suspense fallback={<RouteLoadingSpinner />}>
                <SetupWizard />
              </Suspense>
            }
          />
          <Route
            path='designation'
            element={
              <Suspense fallback={<RouteLoadingSpinner />}>
                <SetupWizard />
              </Suspense>
            }
          />
          <Route
            path='shift'
            element={
              <Suspense fallback={<RouteLoadingSpinner />}>
                <SetupWizard />
              </Suspense>
            }
          />
          <Route
            path='allset'
            element={
              <Suspense fallback={<RouteLoadingSpinner />}>
                <SetupWizard />
              </Suspense>
            }
          />
        </Route>
        <Route
          path='/forgot-password'
          element={
            <Suspense fallback={<RouteLoadingSpinner />}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </>
    ),
    []
  );

  const protectedRoutes = useMemo(
    () => (
      <>
        <Route
          path='/dashboard'
          element={
            <Suspense fallback={<RouteLoadingSpinner />}>
              <AppLayout title='Dashboard'>
                <Dashboard userName={user?.name} />
              </AppLayout>
            </Suspense>
          }
        />
        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </>
    ),
    [user?.name]
  );

  return (
    <BrowserRouter>
      <Routes>{isAuthenticated ? protectedRoutes : publicRoutes}</Routes>
    </BrowserRouter>
  );
};

export default React.memo(AppRouter);
