import { Box, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { AppLayout } from './components/Layout/AppLayout';
import { LoginForm } from './components/Auth/LoginForm';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <CssBaseline />
        <LoginForm />
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
      </ErrorBoundary>
    );
  }

  // Show main app layout if authenticated
  return (
    <ErrorBoundary>
      <CssBaseline />
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
    </ErrorBoundary>
  );
}

export default App;
