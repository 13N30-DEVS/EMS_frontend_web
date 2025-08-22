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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const primaryColor = '#3F51B5';

  const fieldStyles = {
    mb: 3,
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: primaryColor },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#6a8ee0',
        boxShadow: '0 0 4px rgba(106,142,224,0.2)',
      },
    },
    '& .MuiInputBase-input': {
      padding: '12px 14px',
      fontSize: 16,
      fontWeight: 500,
      '::placeholder': { fontSize: 13, fontWeight: 500, color: '#888', opacity: 1 },
    },
    '& .MuiInputLabel-root': { fontSize: 16, fontWeight: 500, color: '#000' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6a8ee0' },
  };

  const isEmailValid = !!email && /\S+@\S+\.\S+/.test(email);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        backgroundImage: "url('/assets/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: '100%',
          maxWidth: 900,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow:
            '0 12px 24px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.08)',
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
            p: { xs: 2, md: 4 },
            backgroundColor: '#fff',
          }}
        >
          <Box
            component="img"
            src="/assets/forgotpage.png"
            alt="Forgot Password Illustration"
            sx={{ width: 280, mb: 4, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))', borderRadius: 2 }}
          />
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#171717', width: '100%', mb: 1.5, textAlign: 'left' }}>
            Forgot Password?
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#757575', width: '100%', maxWidth: 370, lineHeight: 1.5, textAlign: 'left' }}>
            Forgot your password? Enter your email and we'll send a reset link.
          </Typography>
        </Box>

        {/* Divider */}
        <Divider
          orientation='vertical'
          flexItem
          sx={{ display: { xs: 'none', md: 'block' }, backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
        />

        {/* Right Section */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 55%' },
            p: { xs: 4, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#171717', mb: 1.2, mt: { xs: 0, md: 2 } }}>
            Reset Password
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#888', mb: 3, maxWidth: 360, whiteSpace: 'normal', textAlign: 'left' }}>
            Instructions to reset your password will be sent to your email.
          </Typography>

          <TextField
            id='email-input'
            fullWidth
            label='Email Address'
            placeholder='Enter your email'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={fieldStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Email sx={{ color: primaryColor }} />
                </InputAdornment>
              ),
            }}
            type='email'
            autoComplete='email'
            required
          />

          <Button
            disabled={!isEmailValid}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: !isEmailValid ? '#ddd' : primaryColor,
              color: !isEmailValid ? '#888' : '#fff',
              fontWeight: 700,
              py: 1.6,
              borderRadius: 1.2,
              boxShadow: !isEmailValid ? 'none' : `0 4px 18px 0 ${primaryColor}20`,
              textTransform: 'none',
              mt: 2,
            }}
          >
            Send Reset Link
          </Button>

          <Typography sx={{ textAlign: 'center', mt: 3, fontSize: 16, fontWeight: 700, color: '#000' }}>
            Remember your password?{' '}
            <Link component="button" onClick={() => navigate('/login')} underline="hover" sx={{ fontWeight: 700 }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
