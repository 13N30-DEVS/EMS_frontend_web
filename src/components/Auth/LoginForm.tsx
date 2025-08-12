import React, { useState } from 'react';
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
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const primaryColor = '#3F51B5';
  const fontFamily = `'Noto Sans', sans-serif`;

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  const fieldStyles = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      '&:hover fieldset': { borderColor: primaryColor },
      '&.Mui-focused fieldset': {
        borderColor: '#6a8ee0',
        boxShadow: '0 0 4px rgba(106,142,224,0.2)',
      },
    },
    '& .MuiInputBase-input': {
      padding: '10px 12px',
      fontFamily,
      fontSize: 14,
      fontWeight: 500,
      '::placeholder': {
        fontSize: 13,
        fontWeight: 500,
        color: '#888',
        opacity: 1,
        fontFamily,
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: 14,
      fontWeight: 500,
      fontFamily,
      color: '#000',
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6a8ee0' },
  };

  const linkStyles = {
    color: primaryColor,
    fontWeight: 500,
    fontSize: 14,
    fontFamily,
    cursor: 'pointer',
    '&:hover': { color: '#303F9F' },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 5 },
        backgroundImage: "url('/assets/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Responsive Layout
          maxWidth: 900,
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: '#fff',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        }}
      >
        {/* Left Side */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 24 },
              fontWeight: 700,
              color: '#000',
              mb: 2,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Sign In
          </Typography>

          <form
            onSubmit={handleLogin}
            noValidate
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <TextField
              id="email-input"
              fullWidth
              label="Email Address"
              placeholder="Enter your email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={fieldStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: primaryColor }} />
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
              onChange={(e) => setPassword(e.target.value)}
              sx={fieldStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: primaryColor }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleShowPassword}
                      edge="end"
                      size="small"
                      sx={{
                        color: primaryColor,
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
                    size="small"
                    sx={{
                      color: primaryColor,
                      '&.Mui-checked': { color: primaryColor },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#000',
                      fontFamily,
                    }}
                  >
                    Remember Me
                  </Typography>
                }
              />

              <Link
                component="button"
                underline="hover"
                sx={linkStyles}
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.2,
                backgroundColor: primaryColor,
                '&:hover': { backgroundColor: '#303F9F' },
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: `0px 4px 10px ${primaryColor}60`,
                textTransform: 'none',
                fontSize: 16,
              }}
            >
              Sign In
            </Button>
          </form>

          <Typography
            sx={{
              textAlign: 'center',
              color: '#000',
              mt: 1.5,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Don't have an account?{' '}
            <Link
              component="button"
              underline="hover"
              sx={linkStyles}
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Link>
          </Typography>
        </Box>

        {/* Divider — Hidden on Mobile */}
        {!isMobile && <Divider orientation="vertical" flexItem />}

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
            component="img"
            src="/assets/image.png"
            alt="Login Illustration"
            sx={{
              width: { xs: 150, sm: 200, md: 230 },
              mb: 0.5,
            }}
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
            Please authenticate your login to continue using your personalized tools and services.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
