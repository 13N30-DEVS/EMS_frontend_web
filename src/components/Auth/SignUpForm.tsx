import React, { useState } from 'react';
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
import { Email } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import FileUploadField from '../Common/FileUploadField';
import { FILE_RULES } from '../../constants/fileRules';

const SignUpPage: React.FC = () => {
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
      '::placeholder': {
        fontSize: 13,
        fontWeight: 500,
        color: '#888',
        opacity: 1,
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: 16,
      fontWeight: 500,
      color: '#000',
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6a8ee0' },
  } as const;

  const isEmailValid = !!email && /\S+@\S+\.\S+/.test(email);

  const handleCreateAccount = () => {
    if (!isEmailValid) {
      alert('Please enter a valid email address');
      return;
    }
    // API call here
    navigate('/workspace');
  };

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
            component="img"
            src="/assets/signup.png"
            alt="Sign Up Illustration"
            sx={{
              width: 280,
              mb: 1,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              borderRadius: 2,
            }}
          />
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 700,
              color: '#000',
              textAlign: 'center',
              mb: 1,
              mt: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Build something great.
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: '#666',
              textAlign: 'center',
              maxWidth: 280,
              overflowWrap: 'break-word',
            }}
          >
            Create your account in a few simple steps.
          </Typography>
        </Box>

        {/* Divider */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: 'none', md: 'block' },
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          }}
        />

        {/* Right Section */}
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '0 0 55%' },
            p: { xs: 3, md: 5 },
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Sign Up
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 13, md: 16 },
              fontWeight: 500,
              color: '#555',
              mb: 3,
              lineHeight: 1.5,
            }}
          >
            Please enter your email address to create a new account.
          </Typography>

          <TextField
            id="email-input"
            fullWidth
            label="Email Address"
            placeholder="Enter your email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
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

          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleCreateAccount}
            sx={{
              py: 1.5,
              backgroundColor: primaryColor,
              mt: 2,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: 16,
              textTransform: 'none',
              boxShadow: `0px 6px 16px ${primaryColor}80`,
            }}
          >
            Sign Up
          </Button>

          <Typography
            sx={{
              textAlign: 'center',
              mt: 3,
              fontWeight: 700,
            }}
          >
            Already have an account?{' '}
            <Link
              component="button"
              onClick={() => navigate('/login')}
              underline="hover"
              sx={{ fontWeight: 700 }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
