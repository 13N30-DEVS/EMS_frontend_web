import React from 'react';
import { Box, Typography } from '@mui/material';

const Designations: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Designations
      </Typography>
      <Typography variant="body2" sx={{ color: '#666' }}>
        Placeholder page. Build CRUD for designations here.
      </Typography>
    </Box>
  );
};

export default Designations;


