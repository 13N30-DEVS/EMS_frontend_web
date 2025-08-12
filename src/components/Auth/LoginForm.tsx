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
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      fontSize: 16,
      fontWeight: 500,
      '::placeholder': {
        fontSize: 13, // ✅ placeholder font size
        fontWeight: 500, // medium weight
        color: '#888', // light gray for placeholders
        opacity: 1,
        fontFamily,
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: 16,
      fontWeight: 500,
      fontFamily,
      color: '#000',
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6a8ee0' },
  };

  const linkStyles = {
    color: primaryColor,
    fontWeight: 500,
    fontSize: 16,
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
        backgroundImage: "url('/assets/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          maxWidth: 800,
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
            backgroundColor: '#fff',
            gap: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: '#000',
              mb: 2,
              fontFamily,
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
                alignItems: 'center',
                justifyContent: 'space-between',
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
                      fontSize: 16,
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
                sx={{linkStyles, fontWeight: 700,}}
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
                fontFamily,
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
              fontSize: 16,
              fontWeight: 700,
              fontFamily,
            }}
          >
            Don't have an account?{' '}
            <Link
              component="button"
              underline="hover"
              
              sx={{linkStyles, fontWeight: 700,}}
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Link>
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Right Side */}
        <Box
          sx={{
            flex: 0.8,
            p: { xs: 2.5, sm: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            gap: 1,
            fontFamily,
          }}
        >
          <Box
            component="img"
            src="/assets/image.png"
            alt="Login Illustration"
            sx={{ width: { xs: 180, sm: 230 }, mb: 0.5 }}
          />
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: '#000',
              textAlign: 'center',
              fontFamily,
            }}
          >
            Welcome back!
          </Typography>
  <Typography
  sx={{
    maxWidth: 450,         // wider value yields 2-line wrap
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
    color: '#6e6e6eff',
    lineHeight: 1.4,
    fontFamily,
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
