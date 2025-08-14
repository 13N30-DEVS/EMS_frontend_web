import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileUploadField from '../Common/FileUploadField';
import { FILE_RULES } from '../../constants/fileRules';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const roles = ['Admin'];

const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans, sans-serif',
    h5: { fontSize: 24, fontWeight: 700 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14, color: '#555' }
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'medium'
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          color: '#666',
          lineHeight: 1.1
        },
        sizeSmall: {
          fontSize: '16px'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '16px'
        },
        input: {
          paddingTop: 12,
          paddingBottom: 12
        }
      }
    }
  }
});

const WorkspaceSetup: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    workspace: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'Admin',
    logo: null as File | null
  });
  const [errors, setErrors] = useState<any>({});
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev: any) => ({ ...prev, [name]: validateField(name, value) }));

    // If password changes, re-validate confirmPassword against the new password
    if (name === 'password' && form.confirmPassword) {
      setErrors((prev: any) => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', form.confirmPassword),
      }));
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, role: value }));
    setErrors((prev: any) => ({ ...prev, role: validateField('role', value) }));
  };

  

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'workspace':
        return value ? '' : 'Workspace name is required';
      case 'name':
        return value ? '' : 'Name is required';
      case 'password':
        if (!value) return 'Password is required';
        return validatePassword(value)
          ? ''
          : 'Password must be at least 8 characters, include uppercase, lowercase, and a number';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        return value === form.password ? '' : 'Passwords do not match';
      case 'role':
        return value ? '' : 'Role is required';
      default:
        return '';
    }
  };

  const validate = () => {
    let temp: any = {};
    temp.workspace = form.workspace ? '' : 'Workspace name is required';
    temp.name = form.name ? '' : 'Name is required';
    temp.password = form.password
      ? validatePassword(form.password)
        ? ''
        : 'Password must be at least 8 characters, include uppercase, lowercase, and a number'
      : 'Password is required';
    temp.confirmPassword = form.confirmPassword
      ? form.password === form.confirmPassword
        ? ''
        : 'Passwords do not match'
      : 'Please confirm your password';
    temp.role = form.role ? '' : 'Role is required';
    temp.logo = form.logo ? '' : 'Logo is required';
    setErrors(temp);
    return Object.values(temp).every(x => x === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      navigate('/workspace/setup');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
      minHeight: '100vh',
      backgroundImage: "url('/assets/bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
          p: 2
        }}
      >
        <Box
          sx={{
            maxWidth: 1000,
        width: '100%',
        bgcolor: '#fff',
        borderRadius: 2,
            boxShadow: 4,
        display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            overflow: 'hidden'
          }}
        >
          {/* Left side */}
          <Box
            sx={{
              width: { xs: '100%', md: 350 },
          bgcolor: '#fff',
              p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              component="img"
              src="/assets/workspace.jpg"
              alt="Workspace Illustration"
              sx={{ width: 270, mb: 3 }}
            />
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 1, color: '#7e7e7eff' }}>
              “Great things in business are never done by one person. They’re done by a team of
              people.”
          </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            – Steve Jobs
          </Typography>
        </Box>

          {/* Right side */}
          <Box sx={{ flex: 1, p: 4 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
            Setup Your Workspace
          </Typography>
            <Typography variant="body1" sx={{ color: '#7e7e7eff', mb: 3 }}>
            Complete your profile to get started.
          </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3,
                alignItems: 'start'
              }}
            >
              {/* Workspace Name */}
              <TextField
                  name="workspace"
                label="Workspace Name *"
                  value={form.workspace}
                  onChange={handleInputChange}
                onBlur={(e) => setErrors((prev: any) => ({ ...prev, workspace: validateField('workspace', e.target.value) }))}
                error={!!errors.workspace}
                helperText={errors.workspace}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon sx={{ color: '#3855b3' }} />
                    </InputAdornment>
                  )
                }}
              />

              {/* Password */}
              <TextField
                  name="password"
                label="Password *"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleInputChange}
                onBlur={(e) => setErrors((prev: any) => ({ ...prev, password: validateField('password', e.target.value) }))}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#3855b3' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                />

              {/* Name */}
              <TextField
                  name="name"
                label="Name *"
                  value={form.name}
                  onChange={handleInputChange}
                onBlur={(e) => setErrors((prev: any) => ({ ...prev, name: validateField('name', e.target.value) }))}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#3855b3' }} />
                    </InputAdornment>
                  )
                }}
              />

              {/* Confirm Password */}
              <TextField
                  name="confirmPassword"
                label="Confirm Password *"
                type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                onBlur={(e) => setErrors((prev: any) => ({ ...prev, confirmPassword: validateField('confirmPassword', e.target.value) }))}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#3855b3' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              {/* Upload Logo + Message (reusable component) */}
              <Box sx={{ width: '100%' }}>
                <FileUploadField
                  label="Upload Logo"
                  accept="image/png,image/jpeg"
                  rules={FILE_RULES.workspaceLogo}
                  helperWhenEmpty="JPG or PNG only, max 2MB, size 64–1024px"
                  onChange={(info) => {
                    setForm((prev) => ({ ...prev, logo: info?.file ?? null }));
                    setErrors((prev: any) => ({ ...prev, logo: undefined }));
                  }}
                />
              </Box>

              {/* Role Select */}
              <TextField
                select
                label="Select Your Role"
                name="role"
                  value={form.role}
                  onChange={handleRoleChange}
                onBlur={(e) => setErrors((prev: any) => ({ ...prev, role: validateField('role', e.target.value) }))}
                error={!!errors.role}
                helperText={errors.role}
                fullWidth
                >
                {roles.map(role => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
              </TextField>

              {/* Submit */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: '100%',
                    height: '48px',
                    bgcolor: '#3855b3',
                    fontWeight: 700,
                    fontSize: 18,
                    textTransform: 'none',
                    borderRadius: 1.5,
                    fontFamily: 'Noto Sans',
                    '&:hover': { bgcolor: '#2d4493' }
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WorkspaceSetup;
