import { Box, Typography } from '@mui/material';
import React from 'react';

const WorkspacePreview: React.FC = () => (
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
      component='img'
      src='/assets/workspace.jpg'
      alt='Workspace Illustration'
      sx={{ width: 270, mb: 3 }}
    />
    <Typography
      variant='body1'
      sx={{ textAlign: 'center', mb: 1, color: '#7e7e7eff' }}
    >
      “Great things in business are never done by one person. They’re done by a
      team of people.”
    </Typography>
    <Typography
      variant='body1'
      sx={{ fontWeight: 'bold', textAlign: 'center' }}
    >
      – Steve Jobs
    </Typography>
  </Box>
);

export default WorkspacePreview;
