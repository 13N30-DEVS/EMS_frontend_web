// src/components/Auth/SignupFlow.tsx
import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const SignupFlow: React.FC = () => {
  // Use Outlet to render nested routed components for each step
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default SignupFlow;
