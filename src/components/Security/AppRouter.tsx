import { Box, CircularProgress } from '@mui/material';
import React, { lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuthStore } from '../../store/authStore';
import DepartmentSelector from "../Workspace/Departments";
import DesignationSelector from "../Workspace/Designations";
import ShiftSelector from "../Workspace/Shifts";


// Use lazy loading for Dashboard and other components
const LoginForm = lazy(() => import('../Auth/LoginForm'));
const SignupForm = lazy(() => import('../Auth/SignUpForm'));
const ForgotPassword = lazy(() => import('../Auth/ForgotPassword'));
const WorkspaceSetup = lazy(() => import("../Auth/Workspace"));
const SetupWizard = lazy(() => import("../Workspace/SetupWizard"));
const AppLayout = lazy(() =>
 
  import('../Layout/AppLayout').then((module) => ({ default: module.AppLayout }))

);
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));

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

const usePublicRoutes = () => {
  return useMemo(() => [
      { path: "/login", element: <Suspense fallback={<RouteLoadingSpinner />}><LoginForm /></Suspense> },
      { path: "/signup", element: <Suspense fallback={<RouteLoadingSpinner />}><SignupForm /></Suspense> },
      { path: "/workspace", element: <Suspense fallback={<RouteLoadingSpinner />}><WorkspaceSetup /></Suspense> },
      { path: "/workspace/setup", element: <Suspense fallback={<RouteLoadingSpinner />}><SetupWizard /></Suspense> },
      { path: "/workspace/departments", element: <DepartmentSelector open onClose={() => {}} onSave={() => {}} selectedDepartments={[]} /> },
      { path: "/workspace/designations", element: <DesignationSelector open onClose={() => {}} onSave={() => {}} selectedDesignations={[]} /> },
      { path: "/workspace/shifts", element: <ShiftSelector open onClose={() => {}} onSave={() => {}} selectedShifts={[]} /> },
      { path: "/forgot-password", element: <Suspense fallback={<RouteLoadingSpinner />}><ForgotPassword /></Suspense> },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
    []
  );
};

const useProtectedRoutes = (userName?: string) => {
  return useMemo(() => [
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<RouteLoadingSpinner />}>
            <AppLayout title="Dashboard">
              <Dashboard userName={userName} />
            </AppLayout>
          </Suspense>
        ),
      },
      {
        path: "/workspace",
        element: (
          <Suspense fallback={<RouteLoadingSpinner />}>
            <WorkspaceSetup />
          </Suspense>
        ),
      },
      {
        path: "/workspace/setup",
        element: (
          <Suspense fallback={<RouteLoadingSpinner />}>
            <SetupWizard />
          </Suspense>
        ),
      },
      {
        path: "/workspace/departments",
        element: <DepartmentSelector open onClose={() => { }} onSave={() => { }} selectedDepartments={[]} />,
      },
      {
        path: "/workspace/designations",
        element: <DesignationSelector open onClose={() => { }} onSave={() => { }} selectedDesignations={[]} />,
      },
      {
        path: "/workspace/shifts",
        element: <ShiftSelector open onClose={() => { }} onSave={() => { }} selectedShifts={[]} />,
      },
      {
        path: "*",
        element: <Navigate to="/dashboard" replace />,
      },
    ],
    [userName]
  );
};

const AppRouter: React.FC = React.memo(() => {
  const { isAuthenticated, user } = useAuthStore();

  const publicRoutes = usePublicRoutes();
  const protectedRoutes = useProtectedRoutes(user?.name);

  const currentRoutes = useMemo(() => (isAuthenticated ? protectedRoutes : publicRoutes), [isAuthenticated, protectedRoutes, publicRoutes]);

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
