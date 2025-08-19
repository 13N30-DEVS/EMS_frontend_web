import UploadFileIcon from '@mui/icons-material/UploadFile';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import React, { useState, ChangeEvent } from 'react';

const roles = ['Admin', 'Member', 'Viewer'];

const WorkspaceSetup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<{
    workspace: string;
    name: string;
    password: string;
    confirmPassword: string;
    role: string;
    logo: File | null;
  }>({
    workspace: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'Admin',
    logo: null,
  });
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: any) => {
    setForm({ ...form, role: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, logo: e.target.files[0] });
    }
  };

  const validate = () => {
    const temp: any = {};
    temp.workspace = form.workspace ? '' : 'Workspace name is required';
    temp.name = form.name ? '' : 'Name is required';
    temp.password = form.password ? '' : 'Password is required';
    temp.confirmPassword = form.confirmPassword
      ? ''
      : 'Please confirm your password';
    temp.confirmPassword =
      form.password === form.confirmPassword
        ? temp.confirmPassword
        : 'Passwords do not match';
    setErrors(temp);
    return Object.values(temp).every(x => x === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Submit logic here
      alert('Workspace setup successful!');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 900,
          bgcolor: '#fff',
          borderRadius: 2,
          p: 5,
          boxShadow: 6,
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
        >
          {/* Left Side */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              pr: 4,
              width: { md: '45%' },
            }}
          >
            {/* Placeholder for illustration */}
            <Box
              sx={{
                mb: 3,
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Place your SVG or image here */}
              <Box
                sx={{
                  width: 180,
                  height: 140,
                  bgcolor: '#e3ebf7',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 40,
                  color: '#4576ab',
                }}
              >
                <UploadFileIcon fontSize='inherit' />
              </Box>
            </Box>
            {/* Quote */}
            <Typography variant='body1' sx={{ color: '#222', mb: 1 }}>
              “Great things in business are never done by one person. They’re
              done by a team of people.”
            </Typography>
            <Typography variant='subtitle1' fontWeight='bold'>
              – Steve Jobs
            </Typography>
          </Box>

          {/* Right Side */}
          <Box sx={{ width: { xs: '100%', md: '55%' } }}>
            <Box sx={{ px: { xs: 0, md: 4 } }}>
              <Typography variant='h6' fontWeight='bold' gutterBottom>
                Setup Your Workspace
              </Typography>
              <Typography variant='body2' sx={{ color: '#555', mb: 2 }}>
                Complete your profile to get started.
              </Typography>
              <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <TextField
                  label='Workspace Name'
                  name='workspace'
                  required
                  variant='outlined'
                  fullWidth
                  value={form.workspace}
                  onChange={handleInputChange}
                  error={Boolean(errors.workspace)}
                  helperText={errors.workspace}
                />

                <TextField
                  label='Name'
                  name='name'
                  required
                  variant='outlined'
                  fullWidth
                  value={form.name}
                  onChange={handleInputChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />

                <FormControl
                  variant='outlined'
                  fullWidth
                  required
                  error={Boolean(errors.password)}
                >
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <OutlinedInput
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleInputChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword(!showPassword)}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                  <FormHelperText>{errors.password}</FormHelperText>
                </FormControl>

                <FormControl
                  variant='outlined'
                  fullWidth
                  required
                  error={Boolean(errors.confirmPassword)}
                >
                  <InputLabel htmlFor='confirmPassword'>
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    label='Confirm Password'
                  />
                  <FormHelperText>{errors.confirmPassword}</FormHelperText>
                </FormControl>

                <Box>
                  <Button
                    variant='outlined'
                    component='label'
                    startIcon={<UploadFileIcon />}
                    sx={{ mr: 1 }}
                  >
                    Upload Your Logo
                    <input
                      type='file'
                      hidden
                      accept='image/*'
                      onChange={handleFileChange}
                    />
                  </Button>
                  {form.logo && (
                    <Typography variant='caption' sx={{ ml: 1 }}>
                      {form.logo.name}
                    </Typography>
                  )}
                  <Typography
                    variant='caption'
                    display='block'
                    sx={{ mt: 1, color: '#888' }}
                  >
                    Click or drag image here to upload logo (JPG, PNG, max 2MB)
                  </Typography>
                </Box>

                <FormControl fullWidth>
                  <InputLabel id='role-label'>Select Your Role</InputLabel>
                  <Select
                    labelId='role-label'
                    value={form.role}
                    label='Select Your Role'
                    onChange={handleRoleChange}
                  >
                    {roles.map(role => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant='contained'
                  type='submit'
                  color='primary'
                  fullWidth
                  sx={{
                    mt: 1,
                    bgcolor: '#3855b3',
                    '&:hover': { bgcolor: '#4576ab' },
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkspaceSetup;
