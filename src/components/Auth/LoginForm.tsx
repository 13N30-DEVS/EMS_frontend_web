import React, { useState, useMemo, useCallback } from 'react';
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
import { Visibility, VisibilityOff, Lock, Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuthStore } from '../../store/authStore';

// Memoized constants to prevent recreation
const PRIMARY_COLOR = '#3F51B5';
const FONT_FAMILY = `'Noto Sans', sans-serif`;

// Memoized field styles
const useFieldStyles = () => {
  return useMemo(() => ({
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
      fontFamily: FONT_FAMILY,
      fontSize: 14,
      fontWeight: 500,
      '::placeholder': {
        fontSize: 13,
        fontWeight: 500,
        color: '#888',
        opacity: 1,
        fontFamily: FONT_FAMILY,
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: 14,
      fontWeight: 500,
      fontFamily: FONT_FAMILY,
      color: '#000',
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6a8ee0' },
  }), []);
};



// Memoized button styles
const useButtonStyles = () => {
  return useMemo(() => ({
    py: 1.2,
    backgroundColor: PRIMARY_COLOR,
    '&:hover': { backgroundColor: '#303F9F' },
    fontWeight: 700,
    borderRadius: 2,
    boxShadow: `0px 4px 10px ${PRIMARY_COLOR}60`,
    textTransform: 'none' as const,
    fontSize: 16,
  }), []);
};

// Memoized container styles
const useContainerStyles = () => {
  return useMemo(() => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: { xs: 2, sm: 4 },
    py: { xs: 3, sm: 5 },
    backgroundImage: "url('/assets/bg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: FONT_FAMILY,
  }), []);
};

// Memoized paper styles
const usePaperStyles = () => {
  return useMemo(() => ({
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    maxWidth: 900,
    width: '100%',
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  }), []);
};

const LoginForm: React.FC = React.memo(() => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { login, isLoading, error } = useAuthStore();

  // Memoized styles
  const fieldStyles = useFieldStyles();
  const buttonStyles = useButtonStyles();
  const containerStyles = useContainerStyles();
  const paperStyles = usePaperStyles();

  // Memoized event handlers
  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || isLoading) return;
    const ok = await login({ email, password });
    if (ok) {
      navigate('/');
    }
  }, [email, password, isLoading, login, navigate]);

  const handleForgotPassword = useCallback(() => {
    navigate('/forgot-password');
  }, [navigate]);

  const handleSignUp = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  // Memoized form styles
  const formStyles = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 14,
  }), []);

  // Memoized checkbox container styles
  const checkboxContainerStyles = useMemo(() => ({
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'flex-start', sm: 'center' },
    justifyContent: 'space-between',
    gap: 1,
  }), []);

  // Memoized left side styles
  const leftSideStyles = useMemo(() => ({
    flex: 1,
    p: { xs: 3, sm: 4 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 1.5,
  }), []);

  // Memoized right side styles
  const rightSideStyles = useMemo(() => ({
    flex: 0.8,
    p: { xs: 2.5, sm: 5 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  }), []);

  // Memoized image styles
  const imageStyles = useMemo(() => ({
    width: { xs: 150, sm: 200, md: 230 },
    mb: 0.5,
  }), []);

  // Memoized title styles
  const titleStyles = useMemo(() => ({
    fontSize: { xs: 20, sm: 24 },
    fontWeight: 700,
    color: '#000',
    fontFamily: "'Noto Sans', sans-serif",
    mb: 2,
    textAlign: { xs: 'center', md: 'left' },
  }), []);

  // Memoized welcome title styles
  const welcomeTitleStyles = useMemo(() => ({
    fontSize: { xs: 20, sm: 24 },
    fontWeight: 700,
    textAlign: 'center',
    fontFamily: "'Noto Sans', sans-serif",
  }), []);

  // Memoized description styles
  const descriptionStyles = useMemo(() => ({
    maxWidth: 450,
    textAlign: 'center',
    fontSize: { xs: 14, sm: 16 },
    fontWeight: 500,
    color: '#6e6e6eff',
    lineHeight: 1.4,
    margin: '0 auto',
    fontFamily: "'Noto Sans', sans-serif",
  }), []);

  // Memoized sign up text styles
  const signUpTextStyles = useMemo(() => ({
    textAlign: 'center',
    color: '#000',
    mt: 1.5,
    fontSize: 16,
    fontWeight: 700,
    fontFamily: FONT_FAMILY,
  }), []);

  return (
    <Box sx={containerStyles}>
      <Paper elevation={6} sx={paperStyles}>
        {/* Left Side */}
        <Box sx={leftSideStyles}>
          <Typography sx={titleStyles}>
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 1.5 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin} noValidate style={formStyles}>
            <TextField
              id="email-input"
              fullWidth
              label="Email Address"
              placeholder="Enter your email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              sx={fieldStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: PRIMARY_COLOR }} />
                  </InputAdornment>
                ),
              }}
              type="email"
              autoComplete="email"
              required
            />

            <TextField
              id="password-input"
              fullWidth
              label="Password"
              placeholder="Enter your password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              sx={fieldStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: PRIMARY_COLOR }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleShowPassword}
                      edge="end"
                      size="small"
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
              autoComplete="current-password"
              required
            />

            <Box sx={checkboxContainerStyles}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: PRIMARY_COLOR,
                      '&.Mui-checked': { color: PRIMARY_COLOR },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#000',
                      fontFamily: FONT_FAMILY,
                    }}
                  >
                    Remember Me
                  </Typography>
                }
              />

              <Link
                component="button"
                underline="hover"
                sx={{ fontWeight: 500 }}
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={buttonStyles}
            >
              {isLoading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
            </Button>
          </form>

          <Typography sx={signUpTextStyles}>
            Don't have an account?{' '}
            <Link
              component="button"
              underline="hover"
              sx={{ fontWeight: 700 }}
              onClick={handleSignUp}
            >
              Sign up
            </Link>
          </Typography>
        </Box>

        {/* Divider — Hidden on Mobile */}
        {!isMobile && <Divider orientation="vertical" flexItem />}

        {/* Right Side */}
        <Box sx={rightSideStyles}>
          <Box
            component="img"
            src="/assets/image.png"
            alt="Login Illustration"
            sx={imageStyles}
          />
          <Typography sx={welcomeTitleStyles}>
            Welcome back!
          </Typography>

          <Typography sx={descriptionStyles}>
            Please authenticate your login to continue using your personalized tools and services.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
