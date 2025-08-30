import { Email } from '@mui/icons-material';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  Link,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignupStore } from '../../store/signupStore';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { COMMON_STYLES } from '../Common/SignupFormStyle';

const PRIMARY_COLOR = '#3F51B5';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { data, setData } = useSignupStore();
  const [email, setEmail] = useState(data.email || '');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailInputRef = useRef<HTMLDivElement>(null);

  const isEmailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);

  useEffect(() => {
    if (email && !isEmailValid)
      setEmailError('Please enter a valid work email (e.g., name@company.com)');
    else setEmailError('');
  }, [email, isEmailValid]);

  const handleCreateAccount = useCallback(async () => {
    if (!isEmailValid) {
      setEmailError('Please enter a valid email address');
      emailInputRef.current?.querySelector('input')?.focus();
      return;
    }
    setLoading(true);
    try {
      setData({ email });
      navigate('/signup/workspace');
    } catch {
      setEmailError('Failed to create account. Please try again.');
      emailInputRef.current?.querySelector('input')?.focus();
    } finally {
      setLoading(false);
    }
  }, [isEmailValid, email, setData, navigate]);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const buttonStyles: SxProps<Theme> = [
    COMMON_STYLES.button,
    loading ? { color: 'transparent' } : {},
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        backgroundImage: `url('/assets/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: '100%',
          maxWidth: 900,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
          backgroundColor: '#fff',
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 45%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 0.5, md: 1 },
            py: { xs: 2, md: 3 },
            backgroundColor: '#fff',
          }}
        >
          <Box
            component='img'
            src='/assets/signup.png'
            alt='Sign Up Illustration'
            loading='lazy'
            sx={{
              width: 280,
              mb: 1,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              borderRadius: 2,
              outlineOffset: '2px',
            }}
            tabIndex={-1}
          />
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 22, md: 24 },
              fontWeight: 700,
              color: '#000',
              textAlign: 'center',
              mb: 1,
            }}
          >
            Start your journey with us.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 15, md: 16 },
              fontWeight: 500,
              color: '#666',
              textAlign: 'center',
              maxWidth: 280,
              overflowWrap: 'break-word',
            }}
          >
            Create your account in just a few guided steps to set up your
            workspace.
          </Typography>
        </Box>

        {/* Divider */}
        <Divider
          orientation='vertical'
          flexItem
          sx={{ display: { xs: 'none', md: 'block' } }}
        />

        {/* Right Section */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 55%' },
            p: { xs: 3, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Sign Up Heading */}
          <Typography
            variant='h5'
            sx={{
              mb: 2,
              fontWeight: 700,
              color: '#000',
              alignSelf: 'flex-start',
              textAlign: 'left',
              fontSize: { xs: 20, sm: 22, md: 24 },
            }}
          >
            Sign Up
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 12, sm: 14, md: 16 },
              fontWeight: 500,
              color: '#555',
              mb: 3,
              lineHeight: 1.5,
            }}
          >
            Enter a valid email to start. We’ll confirm it before workspace
            setup.
          </Typography>

          <Box ref={emailInputRef} sx={{ width: '100%' }}>
            <TextField
              id='email-input'
              fullWidth
              label='Work Email Address'
              placeholder='name@company.com'
              variant='outlined'
              value={email}
              onChange={handleEmailChange}
              sx={COMMON_STYLES.field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Email sx={{ color: PRIMARY_COLOR }} />
                  </InputAdornment>
                ),
                'aria-describedby': emailError ? 'email-error-text' : undefined,
              }}
              inputProps={{
                'aria-label': 'Work Email Address',
                'aria-invalid': !!emailError,
              }}
              type='email'
              required
              error={Boolean(emailError)}
            />
            {emailError && (
              <Typography
                id='email-error-text'
                role='alert'
                sx={{ color: '#d32f2f', mt: 0.5, fontSize: 13 }}
              >
                {emailError}
              </Typography>
            )}
          </Box>

          <Button
            type='button'
            fullWidth
            variant='contained'
            onClick={handleCreateAccount}
            disabled={loading}
            sx={buttonStyles}
            aria-live='polite'
            aria-busy={loading}
          >
            {loading ? <LoadingSpinner size={24} /> : 'Sign Up'}
          </Button>

          <Typography
            variant='body1'
            sx={{ mt: 3, fontWeight: 700, textAlign: 'center' }}
          >
            Already registered?{' '}
            <Link
              component='button'
              onClick={() => navigate('/login')}
              underline='hover'
              sx={{ fontWeight: 700 }}
              tabIndex={0}
              aria-label='Go to Sign In page'
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default React.memo(SignUpForm);
