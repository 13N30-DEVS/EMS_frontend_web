import { Visibility, VisibilityOff, Lock, Email } from '@mui/icons-material';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  useMediaQuery,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../store/authStore';

const PRIMARY_COLOR = '#3F51B5';

// Memoized field styles
const useFieldStyles = () => {
  return useMemo(
    () => ({
      mb: 2,
      '& .MuiOutlinedInput-root': {
        borderRadius: 3,
        transition: 'all 0.3s ease',
        backgroundColor: '#fafafa',
        '&:hover fieldset': { borderColor: PRIMARY_COLOR },
        '&.Mui-focused fieldset': {
          borderColor: '#6a8ee0',
          boxShadow: '0 0 4px rgba(106,142,224,0.2)',
        },
      },
      '& .MuiInputBase-input': {
        padding: '10px 12px',
        fontSize: 14,
        fontWeight: 500,
        '::placeholder': {
          fontSize: 13,
          fontWeight: 500,
          color: '#888',
          opacity: 1,
        },
      },
      '& .MuiInputLabel-root': {
        fontSize: 14,
        fontWeight: 500,
        color: '#000',
      },
      '& .MuiInputLabel-root.Mui-focused': { color: '#6a8ee0' },
    }),
    []
  );
};

// Memoized button styles
const useButtonStyles = () => {
  return useMemo(
    () => ({
      py: 1.2,
      backgroundColor: PRIMARY_COLOR,
      '&:hover': { backgroundColor: '#303F9F' },
      fontWeight: 700,
      borderRadius: 2,
      boxShadow: `0px 4px 10px ${PRIMARY_COLOR}60`,
      textTransform: 'none' as const,
      fontSize: 16,
      minHeight: { xs: 48, sm: 40 }, // Better touch targets on mobile
    }),
    []
  );
};

// Memoized container styles
const useContainerStyles = () => {
  return useMemo(
    () => ({
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: { xs: 2, sm: 4 },
      py: { xs: 3, sm: 5 },
      backgroundImage: "url('/assets/bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
    []
  );
};

// Memoized paper styles
const usePaperStyles = () => {
  return useMemo(
    () => ({
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      maxWidth: 900,
      width: '100%',
      borderRadius: 3,
      overflow: 'hidden',
      backgroundColor: '#fff',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    }),
    []
  );
};

const LoginForm: React.FC = React.memo(() => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Connect to auth store
  const { login, isLoading, error, clearError } = useAuthStore();

  // Memoized styles
  const fieldStyles = useFieldStyles();
  const buttonStyles = useButtonStyles();
  const containerStyles = useContainerStyles();
  const paperStyles = usePaperStyles();

  // Clear errors when user types
  useEffect(() => {
    if (errors.email && email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    if (errors.password && password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  }, [email, password, errors]);

  // Clear auth store error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Rate limiting: Lock form after 5 failed attempts
  useEffect(() => {
    if (attempts >= 5) {
      setLocked(true);
      const timer = setTimeout(() => {
        setLocked(false);
        setAttempts(0);
      }, 300000); // 5 minutes
      return () => clearTimeout(timer);
    }
  }, [attempts]);

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  // Memoized event handlers
  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (locked) {
        return;
      }

      if (!validateForm()) {
        return;
      }

      try {
        const success = await login({ email: email.trim(), password });
        if (success) {
          setShowSuccess(true);
          setTimeout(() => navigate('/'), 1500); // Show success message briefly
        } else {
          setAttempts(prev => prev + 1);
        }
      } catch (err) {
        setAttempts(prev => prev + 1);
      }
    },
    [email, password, login, navigate, locked, validateForm]
  );

  const handleForgotPassword = useCallback(() => {
    navigate('/forgot-password');
  }, [navigate]);

  const handleSignUp = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  // Memoized form styles
  const formStyles = useMemo(
    () => ({
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 14,
    }),
    []
  );

  // Memoized checkbox container styles
  const checkboxContainerStyles = useMemo(
    () => ({
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'flex-start', sm: 'center' },
      justifyContent: 'space-between',
      gap: 1,
    }),
    []
  );

  // Memoized left side styles
  const leftSideStyles = useMemo(
    () => ({
      flex: 1,
      p: { xs: 3, sm: 4 },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 1.5,
    }),
    []
  );

  // Memoized right side styles
  const rightSideStyles = useMemo(
    () => ({
      flex: 0.8,
      p: { xs: 2.5, sm: 5 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
    }),
    []
  );

  // Memoized image styles
  const imageStyles = useMemo(
    () => ({
      width: { xs: 150, sm: 200, md: 230 },
      mb: 0.5,
    }),
    []
  );

  // Memoized title styles
  const titleStyles = useMemo(
    () => ({
      fontSize: { xs: 20, sm: 24 },
      fontWeight: 700,
      color: '#000',
      fontFamily: "'Noto Sans', sans-serif",
      mb: 2,
      textAlign: { xs: 'center', md: 'left' },
    }),
    []
  );

  // Memoized welcome title styles
  const welcomeTitleStyles = useMemo(
    () => ({
      fontSize: { xs: 20, sm: 24 },
      fontWeight: 700,
      textAlign: 'center',
      fontFamily: "'Noto Sans', sans-serif",
    }),
    []
  );

  // Memoized description styles
  const descriptionStyles = useMemo(
    () => ({
      maxWidth: 450,
      textAlign: 'center',
      fontSize: { xs: 14, sm: 16 },
      fontWeight: 500,
      color: '#6e6e6eff',
      lineHeight: 1.4,
      margin: '0 auto',
      fontFamily: "'Noto Sans', sans-serif",
    }),
    []
  );

  // Memoized sign up text styles
  const signUpTextStyles = useMemo(
    () => ({
      textAlign: 'center',
      color: '#000',
      mt: 1.5,
      fontSize: 16,
      fontWeight: 700,
    }),
    []
  );

  // Check if form is disabled
  const isFormDisabled = isLoading || locked;

  return (
    <Box sx={containerStyles}>
      <Paper elevation={6} sx={paperStyles}>
        {/* Left Side */}
        <Box sx={leftSideStyles}>
          <Typography sx={titleStyles}>Sign In</Typography>

          {/* Success Message */}
          {showSuccess && (
            <Alert severity='success' sx={{ mb: 1.5 }}>
              Login successful! Redirecting...
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert
              severity='error'
              sx={{ mb: 1.5 }}
              onClose={() => clearError()}
            >
              <Typography variant='body2'>
                {error === 'Invalid credentials'
                  ? 'Email or password is incorrect'
                  : error}
              </Typography>
            </Alert>
          )}

          {/* Rate Limit Warning */}
          {locked && (
            <Alert severity='warning' sx={{ mb: 1.5 }}>
              Too many failed attempts. Please try again in 5 minutes.
            </Alert>
          )}

          <form
            onSubmit={handleLogin}
            noValidate
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <TextField
              id='email-input'
              fullWidth
              label='Email Address'
              placeholder='Enter your email'
              variant='outlined'
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={fieldStyles}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isFormDisabled}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Email sx={{ color: PRIMARY_COLOR }} />
                  </InputAdornment>
                ),
              }}
              type='email'
              autoComplete='email'
              required
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            <TextField
              id='password-input'
              fullWidth
              label='Password'
              placeholder='Enter your password'
              variant='outlined'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              sx={fieldStyles}
              error={!!errors.password}
              helperText={errors.password}
              disabled={isFormDisabled}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock sx={{ color: PRIMARY_COLOR }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={toggleShowPassword}
                      edge='end'
                      size='small'
                      disabled={isFormDisabled}
                      sx={{
                        color: PRIMARY_COLOR,
                        '&:hover': { color: '#303F9F' },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              autoComplete='current-password'
              required
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    disabled={isFormDisabled}
                    sx={{
                      color: PRIMARY_COLOR,
                      '&.Mui-checked': { color: PRIMARY_COLOR },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 14, color: '#000' }}
                  >
                    Remember Me
                  </Typography>
                }
              />
              <Link
                component='button'
                underline='hover'
                sx={{ fontWeight: 500 }}
                onClick={handleForgotPassword}
                disabled={isFormDisabled}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={isFormDisabled || !email.trim() || !password}
              sx={buttonStyles}
            >
              {isLoading ? (
                <CircularProgress size={22} color='inherit' />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          <Typography
            sx={{
              textAlign: 'center',
              color: '#000',
              mt: 1.5,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Don't have an account?{' '}
            <Link
              component='button'
              underline='hover'
              sx={{ fontWeight: 700 }}
              onClick={handleSignUp}
              disabled={isFormDisabled}
            >
              Sign up
            </Link>
          </Typography>
        </Box>

        {/* Divider — Hidden on Mobile */}
        {!isMobile && <Divider orientation='vertical' flexItem />}

        {/* Right Side */}
        <Box
          sx={{
            flex: 0.8,
            p: { xs: 2.5, sm: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Box
            component='img'
            src='/assets/image.png'
            alt='Login Illustration'
            sx={imageStyles}
          />
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 24 },
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Welcome back!
          </Typography>
          <Typography
            sx={{
              maxWidth: 450,
              textAlign: 'center',
              fontSize: { xs: 14, sm: 16 },
              fontWeight: 500,
              color: '#6e6e6eff',
              lineHeight: 1.4,
              margin: '0 auto',
            }}
          >
            Please authenticate your login to continue using your personalized
            tools and services.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
