import BusinessIcon from '@mui/icons-material/Business';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Button,
} from '@mui/material';
import React, { ChangeEvent, FormEvent } from 'react';

import { FILE_RULES } from '../../constants/fileRules';
import {
  roles,
  useWorkspaceValidation,
} from '../../hooks/useWorkspaceValidation';
import FileUploadField from '../Common/FileUploadField';

export interface WorkspaceFormData {
  workspace: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
  logo: File | null;
}

interface WorkspaceFormProps {
  onSubmit: (formData: WorkspaceFormData) => void;
}

const WorkspaceForm: React.FC<WorkspaceFormProps> = ({ onSubmit }) => {
  const {
    form,
    setForm,
    errors,
    setErrors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    validateField,
    validate,
  } = useWorkspaceValidation({
    workspace: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'Admin',
    logo: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));

    if (name === 'password' && form.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: validateField('confirmPassword', form.confirmPassword),
      }));
    }
  };

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, role: value }));
    setErrors(prev => ({ ...prev, role: validateField('role', value) }));
  };

  const handleLogoChange = (info: { file: File | null } | null) => {
    setForm(prev => ({ ...prev, logo: info?.file ?? null }));
    setErrors(prev => ({ ...prev, logo: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3,
        alignItems: 'start',
      }}
    >
      <Box
        sx={{
          gridColumn: '1 / -1',
          mb: { xs: 1, md: 2 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: 20, sm: 22, md: 24 },
            color: '#000',
          }}
        >
          Setup Your Workspace
        </Typography>
        <Typography
          sx={{ color: '#7e7e7e', fontSize: { xs: 13, sm: 15, md: 16 }, mt: 1 }}
        >
          Complete your profile to get started.
        </Typography>
      </Box>
      <TextField
        name='workspace'
        label='Workspace Name *'
        value={form.workspace}
        onChange={handleInputChange}
        error={!!errors.workspace}
        helperText={errors.workspace}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <BusinessIcon sx={{ color: '#3855b3' }} />
            </InputAdornment>
          ),
        }}
        required
      />
      <TextField
        name='name'
        label='Name *'
        value={form.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PersonIcon sx={{ color: '#3855b3' }} />
            </InputAdornment>
          ),
        }}
        required
      />
      <TextField
        name='password'
        label='Password *'
        type={showPassword ? 'text' : 'password'}
        value={form.password}
        onChange={handleInputChange}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LockIcon sx={{ color: '#3855b3' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                size='small'
                onClick={() => setShowPassword(!showPassword)}
                aria-label='Toggle password visibility'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        required
      />
      <TextField
        name='confirmPassword'
        label='Confirm Password *'
        type={showConfirmPassword ? 'text' : 'password'}
        value={form.confirmPassword}
        onChange={handleInputChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LockIcon sx={{ color: '#3855b3' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                size='small'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label='Toggle confirm password visibility'
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        required
      />
      <TextField
        select
        label='Select Your Role'
        name='role'
        value={form.role}
        onChange={handleRoleChange}
        error={!!errors.role}
        helperText={errors.role}
        fullWidth
        required
      >
        {roles.map(role => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ width: '100%' }}>
        <FileUploadField
          label='Upload Logo'
          accept='image/png,image/jpeg,image/gif,image/webp'
          rules={FILE_RULES.workspaceLogo}
          helperWhenEmpty='JPG, PNG, GIF, or WEBP only, max 2MB, size 64–1024px'
          onChange={handleLogoChange}
        />
        {errors.logo && (
          <Typography color='error' variant='caption'>
            {errors.logo}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          gridColumn: '1 / -1',
          mt: 4,
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Button
          variant='contained'
          type='submit'
          sx={{
            height: 52,
            width: { xs: '100%', md: '48%' },
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
  );
};

export default WorkspaceForm;
