import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  Link,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Email, Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

// Memoized constants to prevent recreation
const PRIMARY_COLOR = '#3F51B5';
const FONT_FAMILY = `'Noto Sans', sans-serif`;

const SignUpForm: React.FC = React.memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();

  // Clear auth store error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Clear errors when user types
  useEffect(() => {
    Object.keys(errors).forEach(field => {
      if (errors[field] && formData[field as keyof typeof formData]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    });
  }, [formData, errors]);

  // Memoized field styles (same as LoginForm)
  const useFieldStyles = () => {
    return useMemo(() => ({
      mb: 3,
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
        padding: '12px 14px',
        fontFamily: FONT_FAMILY,
        fontSize: 16,
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
        fontSize: 16,
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
      minHeight: { xs: 48, sm: 40 }, // Better touch targets on mobile
    }), []);
  };

  // Memoized container styles
  const useContainerStyles = () => {
    return useMemo(() => ({
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 3,
      backgroundImage: `url('/assets/bg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontFamily: FONT_FAMILY,
    }), []);
  };

  // Memoized paper styles
  const usePaperStyles = () => {
    return useMemo(() => ({
      width: '100%',
      maxWidth: 900,
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      borderRadius: 4,
      overflow: 'hidden',
      boxShadow: '0 12px 24px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.08)',
      backgroundColor: '#fff',
    }), []);
  };

  const fieldStyles = useFieldStyles();
  const buttonStyles = useButtonStyles();
  const containerStyles = useContainerStyles();
  const paperStyles = usePaperStyles();

  // Form validation
  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, acceptedTerms]);

  // Handle input changes
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Handle form submission
  const handleCreateAccount = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const success = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      
      if (success) {
        setShowSuccess(true);
        setTimeout(() => navigate('/'), 2000); // Show success message briefly
      }
    } catch (err) {
      // Error is handled by the auth store
    }
  }, [formData, validateForm, register, navigate]);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  // Navigate to login
  const handleSignIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  // Check if form is disabled
  const isFormDisabled = isLoading;

  return (
    <Box sx={containerStyles}>
      <Paper elevation={10} sx={paperStyles}>
        {/* Left Section */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 55%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: 3, md: 5 },
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#000',
              fontFamily: FONT_FAMILY,
              textAlign: { xs: 'center', md: 'left' },
              mb: 1,
            }}
          >
            Create Account
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontFamily: FONT_FAMILY,
              textAlign: { xs: 'center', md: 'left' },
              mb: 3,
            }}
          >
            Join us and start managing your EMS operations efficiently
          </Typography>

          {/* Success Message */}
          {showSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Account created successfully! Redirecting to dashboard...
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 2 }}
              onClose={() => clearError()}
            >
              <Typography variant="body2">
                {error}
              </Typography>
            </Alert>
          )}

          <form onSubmit={handleCreateAccount} noValidate>
            <TextField
              id="name-input"
              fullWidth
              label="Full Name"
              placeholder="Enter your full name"
              variant="outlined"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              sx={fieldStyles}
              error={!!errors.name}
              helperText={errors.name}
              disabled={isFormDisabled}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: PRIMARY_COLOR }} />
                  </InputAdornment>
                ),
              }}
              required
              autoComplete="name"
            />

            <TextField
              id="email-input"
              fullWidth
              label="Email Address"
              placeholder="Enter your email"
              variant="outlined"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              sx={fieldStyles}
              error={!!errors.email}
              helperText={errors.email}
              disabled={isFormDisabled}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: PRIMARY_COLOR }} />
                  </InputAdornment>
                ),
              }}
              type="email"
              required
              autoComplete="email"
            />

            <TextField
              id="password-input"
              fullWidth
              label="Password"
              placeholder="Create a strong password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              sx={fieldStyles}
              error={!!errors.password}
              helperText={errors.password}
              disabled={isFormDisabled}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: PRIMARY_COLOR }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={togglePasswordVisibility}
                      size="small"
                      disabled={isFormDisabled}
                      sx={{
                        color: PRIMARY_COLOR,
                        minWidth: 'auto',
                        p: 1,
                        '&:hover': { backgroundColor: 'rgba(63, 81, 181, 0.1)' },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              }}
              required
              autoComplete="new-password"
            />

            <TextField
              id="confirm-password-input"
              fullWidth
              label="Confirm Password"
              placeholder="Confirm your password"
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              sx={fieldStyles}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              disabled={isFormDisabled}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: PRIMARY_COLOR }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={toggleConfirmPasswordVisibility}
                      size="small"
                      disabled={isFormDisabled}
                      sx={{
                        color: PRIMARY_COLOR,
                        minWidth: 'auto',
                        p: 1,
                        '&:hover': { backgroundColor: 'rgba(63, 81, 181, 0.1)' },
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              }}
              required
              autoComplete="new-password"
            />

            {/* Terms and Conditions */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  disabled={isFormDisabled}
                  sx={{
                    color: PRIMARY_COLOR,
                    '&.Mui-checked': { color: PRIMARY_COLOR },
                  }}
                />
              }
              label={
                <Typography
                  variant="body2"
                  sx={{
                    color: errors.terms ? '#d32f2f' : '#666',
                    fontFamily: FONT_FAMILY,
                  }}
                >
                  I agree to the{' '}
                  <Link
                    component="button"
                    underline="hover"
                    sx={{ color: PRIMARY_COLOR, fontWeight: 500 }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Terms and Conditions
                  </Link>
                </Typography>
              }
              sx={{ mb: 2 }}
            />

            {errors.terms && (
              <Typography variant="caption" color="error" sx={{ display: 'block', mb: 2 }}>
                {errors.terms}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isFormDisabled || !acceptedTerms}
              sx={buttonStyles}
            >
              {isLoading ? <CircularProgress size={22} color="inherit" /> : 'Create Account'}
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: '#666',
              fontFamily: FONT_FAMILY,
              mt: 2,
            }}
          >
            Already have an account?{' '}
            <Link
              component="button"
              underline="hover"
              sx={{ color: PRIMARY_COLOR, fontWeight: 500 }}
              onClick={handleSignIn}
              disabled={isFormDisabled}
            >
              Sign in
            </Link>
          </Typography>
        </Box>

        {/* Divider */}
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        {/* Right Section */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 45%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 3, md: 5 },
            gap: 2,
            backgroundColor: '#f8f9fa',
          }}
        >
          <Box
            component="img"
            src="/assets/signup.png"
            alt="Sign Up Illustration"
            sx={{
              width: { xs: 120, sm: 150, md: 180 },
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              fontFamily: FONT_FAMILY,
              color: '#000',
            }}
          >
            Welcome to EMS!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: '#666',
              fontFamily: FONT_FAMILY,
              lineHeight: 1.6,
              maxWidth: 300,
            }}
          >
            Join thousands of professionals managing emergency services efficiently and effectively.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
});

SignUpForm.displayName = 'SignUpForm';

export default SignUpForm;
