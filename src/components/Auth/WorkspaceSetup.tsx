import { Box, ThemeProvider } from '@mui/material';
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignupStore } from '../../store/signupStore';
import { useWorkspaceStore } from '../../store/workspaceStore';
import SignupStepper from '../Common/SignupStepper';
import theme from '../Common/WorkspaceformStyle';

import WorkspaceForm from './WorkspaceForm';
import WorkspacePreview from './WorkspacePreview';

// Container layout for Workspace Setup page
const WorkspaceLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
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
      {children}
    </Box>
  </Box>
);

const WorkspaceSetup: React.FC = () => {
  const navigate = useNavigate();
  const setWorkspaceName = useWorkspaceStore(s => s.setWorkspaceName);
  const { setData, reset } = useSignupStore();

  // Reset signup store on mount
  useEffect(() => {
    reset();
  }, [reset]);

  // Submit handler with typed form data
  const onSubmit = useCallback(
    (formData: {
      workspace: string;
      name: string;
      password: string;
      confirmPassword: string;
      role: string;
      logo: File | null;
    }) => {
      setWorkspaceName(formData.workspace);
      setData(formData);
      navigate('/signup/department');
    },
    [setWorkspaceName, setData, navigate]
  );

  // Optionally toggle stepper visibility here
  const showStepper = false;

  return (
    <ThemeProvider theme={theme}>
      <WorkspaceLayout>
        <Box
          sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Optional Stepper */}
          <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', mt: 1, mb: 1 }}>
            {showStepper && <SignupStepper activeStep={1} />}
          </Box>

          {/* Main content area with preview and form side-by-side on md+ */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              flex: 1,
            }}
          >
            {/* Preview panel */}
            <Box sx={{ flexShrink: 0 }}>
              <WorkspacePreview />
            </Box>

            {/* Form panel */}
            <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
              <WorkspaceForm onSubmit={onSubmit} />
            </Box>
          </Box>
        </Box>
      </WorkspaceLayout>
    </ThemeProvider>
  );
};

export default WorkspaceSetup;
