import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import LoginForm from "../Auth/LoginForm";
import SignupForm from "../Auth/SignUpForm";
import WorkspaceSetup from "../Auth/Workspace";
import SetupWizard from "../Workspace/SetupWizard";
import ForgotPassword from "../Auth/ForgotPassword";
import { AppLayout } from "../Layout/AppLayout";
import { useAuthStore } from "../../store/authStore";
import Departments from "../Workspace/Departments";
import Designations from "../Workspace/Designations";
import Shifts from "../Workspace/Shifts";

const AppRouter: React.FC = () => {
	const { isAuthenticated, user } = useAuthStore();

	return (
		<BrowserRouter>
			<Routes>
				{!isAuthenticated ? (
					<>
						<Route path="/login" element={<LoginForm />} />
						<Route path="/signup" element={<SignupForm />} />
                        <Route path="/workspace" element={<WorkspaceSetup />} />
                        <Route path="/workspace/setup" element={<SetupWizard />} />
                        <Route path="/workspace/departments" element={<Departments />} />
                        <Route path="/workspace/designations" element={<Designations />} />
                        <Route path="/workspace/shifts" element={<Shifts />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="*" element={<Navigate to="/login" replace />} />
					</>
				) : (
					<>
						<Route
							path="/"
							element={
								<AppLayout title="Dashboard">
									<Box>Dashboard</Box>
								</AppLayout>
							}
						/>
                        <Route path="/workspace" element={<WorkspaceSetup />} />
                        <Route path="/workspace/setup" element={<SetupWizard />} />
                        <Route path="/workspace/departments" element={<Departments />} />
                        <Route path="/workspace/designations" element={<Designations />} />
                        <Route path="/workspace/shifts" element={<Shifts />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;


