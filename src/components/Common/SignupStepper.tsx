import { Stepper, Step, StepLabel } from '@mui/material';

const steps = [
  'Email Verification',
  'Workspace Setup',
  'Department Setup',
  'Designation Setup',
  'Shift Setup',
  'Complete',
];

interface SignupStepperProps {
  activeStep: number;
}

const SignupStepper = ({ activeStep }: SignupStepperProps) => (
  <Stepper
    activeStep={activeStep}
    alternativeLabel
    sx={{
      mb: { xs: 3, md: 5 }, // Increased bottom margin for breathing space
      width: '100%',
      maxWidth: 900, // Limit max width for alignment with cards
      mx: 'auto', // Center horizontally
      px: { xs: 1, md: 2 }, // Responsive horizontal padding
      '& .MuiStepLabel-root': {
        fontSize: { xs: 12, md: 15 }, // Responsive font size
        color: '#828282', // Default label color
        '&.Mui-active': {
          color: '#3855b3', // Active step color (brand blue)
          fontWeight: '700',
        },
        '&.Mui-completed': {
          color: '#0c852f', // Completed step color (green)
          fontWeight: '600',
        },
        '& .MuiStepLabel-label': {
          fontWeight: 600,
          transition: 'color 0.3s',
        },
      },
      '& .MuiStepConnector-line': {
        borderColor: '#b9b9b9', // Softer connector line color
        borderTopWidth: 3, // Thicker connector line
      },
    }}
  >
    {steps.map(label => (
      <Step key={label}>
        <StepLabel>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default SignupStepper;
