import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignUpForm";
import ForgotPassword from "../Auth/ForgotPassword";
import { AppLayout } from "../Layout/AppLayout";
import { useAuthStore } from "../../store/authStore";

const AppRouter: React.FC = () => {
	const { isAuthenticated, user } = useAuthStore();

	return (
		<BrowserRouter>
			<Routes>
				{!isAuthenticated ? (
					<>
						<Route path="/login" element={<LoginForm />} />
						<Route path="/signup" element={<SignupForm />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="*" element={<Navigate to="/login" replace />} />
					</>
				) : (
					<>
						<Route
							path="/"
							element={
								<AppLayout title="Dashboard">
									<Box sx={{ p: 3 }}>
										<h1>Welcome to Your App!</h1>
										<p>You are logged in as: {user?.name}</p>
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
										</ul>
									</Box>
								</AppLayout>
							}
						/>
						<Route path="*" element={<Navigate to="/" replace />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;


