import React from 'react';
import { Box, Typography } from '@mui/material';

const Shifts: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Shifts
      </Typography>
      <Typography variant="body2" sx={{ color: '#666' }}>
        Placeholder page. Build shift templates and scheduling here.
      </Typography>
    </Box>
  );
};

export default Shifts;


