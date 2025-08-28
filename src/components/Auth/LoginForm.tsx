import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
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
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../store/authStore';
import {
  useContainerStyles,
  usePaperStyles,
  useFieldStyles,
  useButtonStyles,
  useTitleStyles,
} from '../Common/loginFormStyles';

const LoginForm: React.FC = () => {
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

  const { login, isLoading, error, clearError } = useAuthStore();

  const containerStyles = useContainerStyles();
  const paperStyles = usePaperStyles();
  const fieldStyles = useFieldStyles();
  const buttonStyles = useButtonStyles();
  const titleStyles = useTitleStyles();

  useEffect(() => {
    if (errors.email && email) setErrors(prev => ({ ...prev, email: '' }));
    if (errors.password && password)
      setErrors(prev => ({ ...prev, password: '' }));
  }, [email, password, errors]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (attempts >= 5) {
      setLocked(true);
      const timer = setTimeout(() => {
        setLocked(false);
        setAttempts(0);
      }, 300000); // 5 minutes lock
      return () => clearTimeout(timer);
    }
  }, [attempts]);

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

  const toggleShowPassword = useCallback(
    () => setShowPassword(prev => !prev),
    []
  );

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (locked) return;
      if (!validateForm()) return;
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
    [email, password, login, navigate, locked, validateForm]
  );

  const handleForgotPassword = useCallback(
    () => navigate('/forgot-password'),
    [navigate]
  );
  const handleSignUp = useCallback(() => navigate('/signup'), [navigate]);

  const isFormDisabled = isLoading || locked;

  return (
    <Box sx={containerStyles}>
      <Paper elevation={6} sx={paperStyles}>
        <Box
          flex={1}
          p={{ xs: 3, sm: 4 }}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          gap={1.5}
        >
          <Typography sx={titleStyles}>Sign In</Typography>

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
            />

            <TextField
              id='password-input'
              fullWidth
              label='Password'
              placeholder='Enter your password'
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
                      aria-label='Toggle password visibility'
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
            />

            <Box
              display='flex'
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              justifyContent='space-between'
              gap={1}
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

        {!isMobile && <Divider orientation='vertical' flexItem />}

        <Box
          flex={0.8}
          p={{ xs: 2.5, sm: 5 }}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          gap={1}
        >
          <Box
            component='img'
            src='/assets/image.png'
            alt='Login Illustration'
            sx={{ width: { xs: 150, sm: 200, md: 230 }, mb: 0.5 }}
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
};

const PRIMARY_COLOR = '#3F51B5';
export default React.memo(LoginForm);
