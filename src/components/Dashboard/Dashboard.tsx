import { Box, Typography } from '@mui/material';
import React from 'react';

interface DashboardProps {
  userName?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Welcome to Your App!
      </Typography>

      {userName && (
        <Typography variant='body1' gutterBottom>
          You are logged in as: <strong>{userName}</strong>
        </Typography>
      )}

      <Typography variant='body2'>
        This is your dashboard content. Add charts, cards, or widgets here.
      </Typography>
    </Box>
  );
};

export default Dashboard;
