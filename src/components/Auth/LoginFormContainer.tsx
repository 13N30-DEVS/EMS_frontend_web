import {
  Box,
  Paper,
  Divider,
  Alert,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../store/authStore';
import {
  useContainerStyles,
  usePaperStyles,
  useTitleStyles,
} from '../Common/loginFormStyles';

import LoginFormActions from './LoginFormActions';
import LoginFormFields from './LoginFormFields';
import LoginFormSidebar from './LoginFormSidebar';

const LoginFormContainer: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const { login, isLoading, error, clearError } = useAuthStore();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      if (locked) return;
      try {
        const success = await login({ email: email.trim(), password });
        if (success) {
          setShowSuccess(true);
          setTimeout(() => navigate('/'), 1500);
        } else {
          setAttempts(prev => prev + 1);
        }
      } catch {
        setAttempts(prev => prev + 1);
      }
    },
    [locked, login, navigate]
  );

  useEffect(() => {
    if (attempts >= 5) {
      setLocked(true);
      const timer = setTimeout(() => {
        setLocked(false);
        setAttempts(0);
      }, 300000);
      return () => clearTimeout(timer);
    }
  }, [attempts]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <Box sx={useContainerStyles()}>
      <Paper elevation={6} sx={usePaperStyles()}>
        <Box flex={1} p={{ xs: 3, sm: 4 }}>
          <Typography sx={useTitleStyles()}>Sign In</Typography>

          {showSuccess && (
            <Alert severity='success' sx={{ mb: 1.5 }}>
              Login successful! Redirecting...
            </Alert>
          )}

          {error && (
            <Alert severity='error' sx={{ mb: 1.5 }} onClose={clearError}>
              <Typography variant='body2'>
                {error === 'Invalid credentials'
                  ? 'Email or password is incorrect'
                  : error}
              </Typography>
            </Alert>
          )}

          {locked && (
            <Alert severity='warning' sx={{ mb: 1.5 }}>
              Too many failed attempts. Please try again in 5 minutes.
            </Alert>
          )}

          {/* Form content split into Fields + Actions */}
          <LoginFormFields
            onLogin={handleLogin}
            locked={locked}
            isLoading={isLoading}
            errors={errors}
            setErrors={setErrors}
          />
          <LoginFormActions locked={locked} isLoading={isLoading} />
        </Box>

        {!isMobile && <Divider orientation='vertical' flexItem />}

        <LoginFormSidebar />
      </Paper>
    </Box>
  );
};

export default LoginFormContainer;
