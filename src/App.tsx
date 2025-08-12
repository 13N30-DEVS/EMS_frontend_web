import { Box, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ErrorBoundary } from "./components/Common/ErrorBoundary";
import { AppLayout } from "./components/Layout/AppLayout";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignUpForm"; // <-- your new signup page
import { useAuthStore } from "./store/authStore";
import ForgotPassword from "./components/Auth/ForgotPassword";

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <ErrorBoundary>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* If user is NOT authenticated */}
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/* Redirect root path to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            // If user IS authenticated
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
              {/* Redirect any unknown route to dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
