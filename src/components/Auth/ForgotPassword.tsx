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
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useForgotPasswordValidation } from '../../hooks/useForgotPasswordValidation';
import * as styles from '../Common/ForgotPassword.styles';

const ForgotPassword: React.FC = () => {
  const { email, error, isEmailValid, onEmailChange, validateEmail } =
    useForgotPasswordValidation();
  const navigate = useNavigate();

  const handleSendReset = () => {
    if (!validateEmail(email)) return;
    // TODO: Call API to send reset email
    console.log(`Reset link sent to ${email}`);
  };

  return (
    <Box sx={styles.containerStyles}>
      <Paper sx={styles.paperStyles} elevation={12}>
        <Box sx={styles.leftSectionStyles}>
          <Box
            component='img'
            src='/assets/forgotpage.png'
            alt='Forgot Password Illustration'
            loading='lazy'
            sx={styles.imageStyles}
          />
          <Typography sx={styles.headingStyles}>Forgot Password?</Typography>
          <Typography sx={styles.descriptionStyles}>
            Forgot your password? Enter your email and we'll send a reset link.
          </Typography>
        </Box>

        <Divider
          orientation='vertical'
          flexItem
          sx={{
            display: { xs: 'none', md: 'block' },
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          }}
        />

        <Box sx={styles.rightSectionStyles}>
          <Typography sx={styles.rightHeadingStyles}>Reset Password</Typography>
          <Typography sx={styles.rightDescriptionStyles}>
            Instructions to reset your password will be sent to your email.
          </Typography>

          <TextField
            id='email-input'
            label='Email Address'
            placeholder='Enter your email'
            variant='outlined'
            value={email}
            onChange={e => onEmailChange(e.target.value)}
            sx={styles.textFieldStyles}
            type='email'
            autoComplete='email'
            required
            error={Boolean(error)}
            helperText={error}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Email sx={{ color: '#3F51B5' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            disabled={!email || Boolean(error)}
            onClick={handleSendReset}
            fullWidth
            variant='contained'
            sx={styles.buttonStyles(!!email && !error)}
          >
            Send Reset Link
          </Button>

          <Typography sx={styles.footerTextStyles}>
            Remember your password?{' '}
            <Link
              component='button'
              onClick={() => navigate('/login')}
              underline='hover'
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

export default ForgotPassword;
