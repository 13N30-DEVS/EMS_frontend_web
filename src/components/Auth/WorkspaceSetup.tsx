import { Box, ThemeProvider } from '@mui/material';
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignupStore } from '../../store/signupStore';
import { useWorkspaceStore } from '../../store/workspaceStore';
import theme from '../Common/WorkspaceformStyle';

import WorkspaceForm from './WorkspaceForm';
import WorkspacePreview from './WorkspacePreview';

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

  // Reset signup store to clear old data
  useEffect(() => {
    reset();
  }, [reset]);

  // Memorize onSubmit handler to avoid re-renders
  const onSubmit = useCallback(
    (formData: any) => {
      setWorkspaceName(formData.workspace);
      setData(formData);
      navigate('/signup/department');
    },
    [setWorkspaceName, setData, navigate]
  );

  return (
    <ThemeProvider theme={theme}>
      <WorkspaceLayout>
        <WorkspacePreview />
        <Box sx={{ flex: 1, p: 4 }}>
          <WorkspaceForm onSubmit={onSubmit} />
        </Box>
      </WorkspaceLayout>
    </ThemeProvider>
  );
};

export default WorkspaceSetup;
