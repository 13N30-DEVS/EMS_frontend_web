import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { TextField, Box, InputAdornment, IconButton } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';

import { useFieldStyles } from '../Common/loginFormStyles';

interface Props {
  onLogin: (email: string, password: string) => void;
  locked: boolean;
  isLoading: boolean;
  errors: { email?: string; password?: string };
  setErrors: React.Dispatch<
    React.SetStateAction<{ email?: string; password?: string }>
  >;
}

const LoginFormFields: React.FC<Props> = ({
  onLogin,
  locked,
  isLoading,
  errors,
  setErrors,
}) => {
  const fieldStyles = useFieldStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // validation
  const validateForm = useCallback(() => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password, setErrors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    if (validateForm()) {
      onLogin(email, password);
    }
  };

  useEffect(() => {
    if (errors.email && email) setErrors(prev => ({ ...prev, email: '' }));
    if (errors.password && password)
      setErrors(prev => ({ ...prev, password: '' }));
  }, [email, password, errors, setErrors]);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      <TextField
        fullWidth
        label='Email Address'
        placeholder='Enter your email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        sx={fieldStyles}
        error={!!errors.email}
        helperText={errors.email}
        disabled={isLoading || locked}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Email color='primary' />
            </InputAdornment>
          ),
        }}
        required
      />

      <TextField
        fullWidth
        label='Password'
        placeholder='Enter your password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        sx={fieldStyles}
        error={!!errors.password}
        helperText={errors.password}
        disabled={isLoading || locked}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Lock color='primary' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setShowPassword(prev => !prev)}
                edge='end'
                size='small'
                disabled={isLoading || locked}
                aria-label='Toggle password visibility'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        required
      />
    </form>
  );
};

export default LoginFormFields;
