import { Box, Typography } from '@mui/material';
import React from 'react';

const LoginFormSidebar: React.FC = () => (
  <Box
    flex={0.8}
    p={{ xs: 2.5, sm: 5 }}
    display='flex'
    flexDirection='column'
    alignItems='center'
  >
    <Box
      component='img'
      src='/assets/image.png'
      alt='Login Illustration'
      width={{ xs: 150, sm: 200, md: 230 }}
    />
    <Typography fontSize={{ xs: 20, sm: 24 }} fontWeight={700}>
      Welcome back!
    </Typography>
    <Typography
      textAlign='center'
      fontSize={{ xs: 14, sm: 16 }}
      color='#666'
      maxWidth={400}
    >
      Please authenticate your login to continue using your personalized tools
      and services.
    </Typography>
  </Box>
);
export default LoginFormSidebar;
