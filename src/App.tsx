import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ErrorBoundary } from "./components/Common/ErrorBoundary";
import AppRouter from "./components/Security/AppRouter";

function App() {
  return (
    <ErrorBoundary>
      <CssBaseline />
      <AppRouter />

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

export default App;
