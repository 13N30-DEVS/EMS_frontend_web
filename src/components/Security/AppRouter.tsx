import React, { lazy, Suspense, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import { useAuthStore } from "../../store/authStore";

// Lazy load components for better performance
const LoginForm = lazy(() => import("../Auth/LoginForm"));
const SignupForm = lazy(() => import("../Auth/SignUpForm"));
const ForgotPassword = lazy(() => import("../Auth/ForgotPassword"));
const AppLayout = lazy(() => import("../Layout/AppLayout").then(module => ({ default: module.AppLayout })));

// Loading component for lazy-loaded routes
const RouteLoadingSpinner: React.FC = () => (
	<Box
		sx={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "100vh",
		}}
	>
		<CircularProgress size={60} />
	</Box>
);

// Dashboard component with React.memo optimization
const Dashboard: React.FC<{ userName?: string }> = React.memo(({ userName }) => (
	<Box sx={{ p: 3 }}>
		<h1>Welcome to Your App!</h1>
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
		</ul>
	</Box>
));

Dashboard.displayName = "Dashboard";

// Public routes configuration with useMemo
const usePublicRoutes = () => {
	return useMemo(() => [
		{
			path: "/login",
			element: (
				<Suspense fallback={<RouteLoadingSpinner />}>
					<LoginForm />
				</Suspense>
			),
		},
		{
			path: "/signup",
			element: (
				<Suspense fallback={<RouteLoadingSpinner />}>
					<SignupForm />
				</Suspense>
			),
		},
		{
			path: "/forgot-password",
			element: (
				<Suspense fallback={<RouteLoadingSpinner />}>
					<ForgotPassword />
				</Suspense>
			),
		},
		{
			path: "*",
			element: <Navigate to="/login" replace />,
		},
	], []);
};

// Protected routes configuration with useMemo
const useProtectedRoutes = (userName?: string) => {
	return useMemo(() => [
		{
			path: "/",
			element: (
				<Suspense fallback={<RouteLoadingSpinner />}>
					<AppLayout title="Dashboard">
						<Dashboard userName={userName} />
					</AppLayout>
				</Suspense>
			),
		},
		{
			path: "*",
			element: <Navigate to="/" replace />,
		},
	], [userName]);
};

// Main router component with React.memo optimization
const AppRouter: React.FC = React.memo(() => {
	const { isAuthenticated, user } = useAuthStore();
	
	// Memoize routes based on authentication state
	const publicRoutes = usePublicRoutes();
	const protectedRoutes = useProtectedRoutes(user?.name);
	
	// Memoize the current routes to prevent unnecessary re-renders
	const currentRoutes = useMemo(() => {
		return isAuthenticated ? protectedRoutes : publicRoutes;
	}, [isAuthenticated, protectedRoutes, publicRoutes]);

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

AppRouter.displayName = "AppRouter";

export default AppRouter;


