import React from 'react';
import { Box, Typography } from '@mui/material';

const Departments: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Departments
      </Typography>
      <Typography variant="body2" sx={{ color: '#666' }}>
        Placeholder page. Build CRUD for departments here.
      </Typography>
    </Box>
  );
};

export default Departments;


