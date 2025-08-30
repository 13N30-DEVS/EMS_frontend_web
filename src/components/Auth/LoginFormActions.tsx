import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useButtonStyles } from '../Common/loginFormStyles';

interface Props {
  locked: boolean;
  isLoading: boolean;
}

const LoginFormActions: React.FC<Props> = ({ locked, isLoading }) => {
  const buttonStyles = useButtonStyles();
  const navigate = useNavigate();
  const isDisabled = isLoading || locked;

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <FormControlLabel
          control={<Checkbox size='small' disabled={isDisabled} />}
          label={<Typography fontSize={14}>Remember Me</Typography>}
        />
        <Link
          component='button'
          underline='hover'
          onClick={() => navigate('/forgot-password')}
          disabled={isDisabled}
        >
          Forgot Password?
        </Link>
      </Box>

      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={buttonStyles}
        disabled={isDisabled}
      >
        {isLoading ? <CircularProgress size={22} color='inherit' /> : 'Sign In'}
      </Button>

      <Typography textAlign='center' mt={1.5}>
        Don’t have an account?{' '}
        <Link
          component='button'
          underline='hover'
          onClick={() => navigate('/signup')}
          disabled={isDisabled}
        >
          Sign Up
        </Link>
      </Typography>
    </>
  );
};

export default LoginFormActions;
