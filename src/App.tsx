import React, { useMemo } from "react";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ErrorBoundary } from "./components/Common/ErrorBoundary";
import AppRouter from "./components/Security/AppRouter";

// Toast configuration with useMemo to prevent recreation
const useToastConfig = () => {
	return useMemo(() => ({
		position: "top-right" as const,
		autoClose: 5000,
		hideProgressBar: false,
		newestOnTop: false,
		closeOnClick: true,
		rtl: false,
		pauseOnFocusLoss: true,
		draggable: true,
		pauseOnHover: true,
		theme: "light" as const,
	}), []);
};

// Main App component with React.memo optimization
const App: React.FC = React.memo(() => {
	const toastConfig = useToastConfig();

	return (
		<ErrorBoundary>
			<CssBaseline />
			<AppRouter />
			<ToastContainer {...toastConfig} />
		</ErrorBoundary>
	);
});

App.displayName = "App";

export default App;
