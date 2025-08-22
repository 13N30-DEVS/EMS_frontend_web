import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import FileUploadField from '../Common/FileUploadField';
import { FILE_RULES } from '../../constants/fileRules';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../store/workspaceStore';

const roles = ['Admin'];

const theme = createTheme({
  typography: {
    h5: { fontSize: 24, fontWeight: 700 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14, color: '#555' },
  },
  components: {
    MuiTextField: { defaultProps: { size: 'medium' } },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: 16, color: '#666', lineHeight: 1.1 },
        sizeSmall: { fontSize: 16 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { fontSize: 16 },
        input: { paddingTop: 12, paddingBottom: 12 },
      },
    },
  },
});

const WorkspaceSetup: React.FC = () => {
  const navigate = useNavigate();
  const setWorkspaceName = useWorkspaceStore((s) => s.setWorkspaceName);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    workspace: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'Admin',
    logo: null as File | null,
  });

  // Errors state allows string or undefined values
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    if (name === 'password' && form.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', form.confirmPassword),
      }));
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, role: value }));
    setErrors((prev) => ({ ...prev, role: validateField('role', value) }));
  };

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'workspace':
        return value ? undefined : 'Workspace name is required';
      case 'name':
        return value ? undefined : 'Name is required';
      case 'password':
        if (!value) return 'Password is required';
        return validatePassword(value)
          ? undefined
          : 'Password must be at least 8 characters, include uppercase, lowercase, and a number';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        return value === form.password ? undefined : 'Passwords do not match';
      case 'role':
        return value ? undefined : 'Role is required';
      default:
        return undefined;
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string | undefined> = {
      workspace: form.workspace ? undefined : 'Workspace name is required',
      name: form.name ? undefined : 'Name is required',
      password: form.password
        ? validatePassword(form.password)
          ? undefined
          : 'Password must be at least 8 characters, include uppercase, lowercase, and a number'
        : 'Password is required',
      confirmPassword: form.confirmPassword
        ? form.password === form.confirmPassword
          ? undefined
          : 'Passwords do not match'
        : 'Please confirm your password',
      role: form.role ? undefined : 'Role is required',
      logo: form.logo ? undefined : 'Logo is required',
    };
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // ✅ Save workspace name to Zustand (persisted)
      setWorkspaceName(form.workspace);
      // Continue to the next screen in your onboarding
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
          p: 2,
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
            overflow: 'hidden',
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
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src="/assets/workspace.jpg"
              alt="Workspace Illustration"
              sx={{ width: 270, mb: 3 }}
            />
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 1, color: '#7e7e7eff' }}>
              “Great things in business are never done by one person. They’re done by a team of people.”
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
                alignItems: 'start',
              }}
            >
              <TextField
                name="workspace"
                label="Workspace Name *"
                value={form.workspace}
                onChange={handleInputChange}
                onBlur={(e) => setErrors((prev) => ({ ...prev, workspace: validateField('workspace', e.target.value) }))}
                error={!!errors.workspace}
                helperText={errors.workspace}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon sx={{ color: '#3855b3' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="password"
                label="Password *"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleInputChange}
                onBlur={(e) => setErrors((prev) => ({ ...prev, password: validateField('password', e.target.value) }))}
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
                      <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="name"
                label="Name *"
                value={form.name}
                onChange={handleInputChange}
                onBlur={(e) => setErrors((prev) => ({ ...prev, name: validateField('name', e.target.value) }))}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#3855b3' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="confirmPassword"
                label="Confirm Password *"
                type={showConfirmPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleInputChange}
                onBlur={(e) => setErrors((prev) => ({ ...prev, confirmPassword: validateField('confirmPassword', e.target.value) }))}
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
                      <IconButton size="small" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ width: '100%' }}>
                <FileUploadField
                  label="Upload Logo"
                  accept="image/png,image/jpeg"
                  rules={FILE_RULES.workspaceLogo}
                  helperWhenEmpty="JPG or PNG only, max 2MB, size 64–1024px"
                  onChange={(info) => {
                    setForm((prev) => ({ ...prev, logo: info?.file ?? null }));
                    setErrors((prev) => ({ ...prev, logo: undefined }));
                  }}
                />
              </Box>

              <TextField
                select
                label="Select Your Role"
                name="role"
                value={form.role}
                onChange={handleRoleChange}
                onBlur={(e) => setErrors((prev) => ({ ...prev, role: validateField('role', e.target.value) }))}
                error={!!errors.role}
                helperText={errors.role}
                fullWidth
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>

              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: '100%',
                    height: 48,
                    bgcolor: '#3855b3',
                    fontWeight: 700,
                    fontSize: 18,
                    textTransform: 'none',
                    borderRadius: 1.5,
                    '&:hover': { bgcolor: '#2d4493' },
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
