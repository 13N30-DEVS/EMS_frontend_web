import React from 'react';
import { Box, Paper, Typography, Button, Grid, Chip } from '@mui/material';
import Groups3OutlinedIcon from '@mui/icons-material/Groups3Outlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useNavigate } from 'react-router-dom';

const cardStyle = {
  p: 3,
  borderRadius: 2,
  boxShadow: 3,
  bgcolor: '#fff',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'space-between',
};

const StepCard: React.FC<{
  step: number;
  title: string;
  description: string;
  cta: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ step, title, description, cta, icon, onClick }) => {
  return (
    <Paper sx={cardStyle}>
      <Box>
        <Chip
          label={`Step ${step}`}
          sx={{ alignSelf: 'flex-start', mb: 2, bgcolor: '#eef0ff', color: '#5a6ad6', fontWeight: 700 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
          {icon}
        </Box>
      </Box>
      <Button
        fullWidth
        variant="contained"
        onClick={onClick}
        sx={{ textTransform: 'none', fontWeight: 700, height: 44, bgcolor: '#3855b3', '&:hover': { bgcolor: '#2d4493' } }}
      >
        {cta}
      </Button>
    </Paper>
  );
};

const SetupWizard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: "url('/assets/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1200, bgcolor: '#ffffffdd', borderRadius: 2, boxShadow: 6, p: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Hi there!
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Just a few clicks to launch your organization.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <StepCard
              step={1}
              title="Setup Departments"
              description="Organize your team based on roles or functions (e.g., Human Resources, Marketing)."
              cta="Add Departments"
              onClick={() => navigate('/workspace/departments')}
              icon={<Groups3OutlinedIcon sx={{ fontSize: 120, color: '#9aa7ff' }} />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StepCard
              step={2}
              title="Setup Designations"
              description="Define titles or roles within departments (e.g., Manager, Developer, Intern)."
              cta="Add Designations"
              onClick={() => navigate('/workspace/designations')}
              icon={<BadgeOutlinedIcon sx={{ fontSize: 120, color: '#9aa7ff' }} />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StepCard
              step={3}
              title="Setup Shifts"
              description="Structure employee work hours based on time slots (e.g., First Shift, Night Shift)."
              cta="Add Shifts"
              onClick={() => navigate('/workspace/shifts')}
              icon={<AccessTimeOutlinedIcon sx={{ fontSize: 120, color: '#9aa7ff' }} />}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StepCard
              step={4}
              title="You're all set!"
              description="Your organization setup is complete. You can start managing from your dashboard."
              cta="Go To Dashboard"
              onClick={() => navigate('/')}
              icon={<CheckCircleOutlinedIcon sx={{ fontSize: 120, color: '#9aa7ff' }} />}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SetupWizard;


