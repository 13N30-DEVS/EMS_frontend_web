import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Paper, Typography, Button } from '@mui/material';
import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useWorkspaceStore } from '../../store/workspaceStore';
import SignupStepper from '../Common/SignupStepper';

import DepartmentSelector from './Departments';
import DesignationSelector from './Designations';
import ShiftSelector, { Shift } from './Shifts';

const PRIMARY_COLOR = '#6373e9';

const steps = [
  {
    title: 'Setup Departments',
    description:
      'Departments help you organize your team based on roles or functions (e.g., HR, Marketing...)',
    cta: 'Add Departments',
    illustration: (
      <img
        src='/assets/department.png'
        alt='Departments'
        style={{ height: 200, width: 200, objectFit: 'contain' }}
      />
    ),
    path: '/signup/department',
  },
  {
    title: 'Setup Designations',
    description:
      'Designations define the titles or roles of individuals (e.g., Manager, Developer, Intern...)',
    cta: 'Add Designations',
    illustration: (
      <img
        src='/assets/designation.png'
        alt='Designations'
        style={{ height: 200, width: 200, objectFit: 'contain' }}
      />
    ),
    path: '/signup/designation',
  },
  {
    title: 'Setup Shifts',
    description:
      'Shifts help you structure work hours (e.g., Day, Night, Rotational...)',
    cta: 'Add Shifts',
    illustration: (
      <img
        src='/assets/shift.png'
        alt='Shifts'
        style={{ height: 200, width: 200, objectFit: 'contain' }}
      />
    ),
    path: '/signup/shift',
  },
  {
    title: "You're all set!",
    description:
      'Organization setup completed. Access your dashboard to start managing.',
    cta: 'Finish Setup',
    illustration: (
      <img
        src='/assets/allset.png'
        alt='All Set'
        style={{ height: 200, width: 200, objectFit: 'contain' }}
      />
    ),
    path: '/signup/allset',
  },
];

const pathToStep: Record<string, number> = {
  '/signup/department': 0,
  '/signup/designation': 1,
  '/signup/shift': 2,
  '/signup/allset': 3,
};

const stepPathList = steps.map(s => s.path);

const SetupWizard: React.FC = () => {
  const workspaceName = useWorkspaceStore(state => state.workspaceName);
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(pathToStep[location.pathname] ?? 0);
  }, [location.pathname]);

  const [deptModalOpen, setDeptModalOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [step1Completed, setStep1Completed] = useState(false);

  const [desigModalOpen, setDesigModalOpen] = useState(false);
  const [selectedDesignations, setSelectedDesignations] = useState<string[]>(
    []
  );
  const [step2Completed, setStep2Completed] = useState(false);

  const [shiftModalOpen, setShiftModalOpen] = useState(false);
  const [selectedShifts, setSelectedShifts] = useState<Shift[]>([]);
  const [step3Completed, setStep3Completed] = useState(false);

  const outerBoxStyles = useMemo(
    () => ({
      minHeight: 420,
      width: '100%',
      maxWidth: 1500,
      backgroundImage: "url('/assets/bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: { xs: 0, sm: 2, md: 3 },
      py: { xs: 2, md: 4 },
      margin: '0 auto',
    }),
    []
  );

  const paperStyles = useMemo(
    () => ({
      width: '100%',
      maxWidth: { xs: 430, sm: 650, md: 1280 },
      minHeight: 540,
      borderRadius: 4,
      backgroundColor: '#fff',
      p: { xs: 1, sm: 2.5, md: 4 },
      boxShadow: '0 10px 32px #bfc8e720',
      border: '1px solid #ececf3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      position: 'relative',
      justifyContent: 'center',
    }),
    []
  );

  const goToStep = (idx: number) => navigate(stepPathList[idx]);

  const showStepper = false;
  return (
    <Box sx={outerBoxStyles}>
      <Box sx={paperStyles}>
        <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', mt: 1, mb: 1 }}>
          {showStepper && <SignupStepper activeStep={currentStep + 2} />}
        </Box>

        <Box sx={{ mb: 3.5, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant='h6'
            sx={{ fontWeight: 700, fontSize: 20, color: '#16192F', mb: 0.3 }}
          >
            Hi {workspaceName || 'Admin'} !
          </Typography>
          <Typography variant='body2' sx={{ color: '#83839a', fontSize: 16 }}>
            Just a few clicks to launch your organization!
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, sm: 3, md: 3 },
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: '1fr',
              lg: 'repeat(4, 1fr)',
            },
            width: '100%',
          }}
        >
          {steps.map((step, idx) => (
            <StepCard
              key={idx}
              step={idx + 1}
              title={step.title}
              description={step.description}
              cta={step.cta}
              onClick={() => {
                if (idx === currentStep) {
                  if (idx === 0) setDeptModalOpen(true);
                  else if (idx === 1) setDesigModalOpen(true);
                  else if (idx === 2) setShiftModalOpen(true);
                }
              }}
              illustration={step.illustration}
              active={idx === currentStep}
              disabled={
                idx !== currentStep ||
                (idx === 3 &&
                  !(step1Completed && step2Completed && step3Completed))
              }
              success={
                (idx === 0 && step1Completed) ||
                (idx === 1 && step2Completed) ||
                (idx === 2 && step3Completed)
              }
            />
          ))}
        </Box>
      </Box>

      <DepartmentSelector
        open={deptModalOpen}
        onClose={() => setDeptModalOpen(false)}
        onSave={selected => {
          if (selected.length > 0) {
            setSelectedDepartments(selected);
            setStep1Completed(true);
            goToStep(1);
          }
          setDeptModalOpen(false);
        }}
        selectedDepartments={selectedDepartments}
      />
      <DesignationSelector
        open={desigModalOpen}
        onClose={() => setDesigModalOpen(false)}
        onSave={selected => {
          if (selected.length > 0) {
            setSelectedDesignations(selected);
            setStep2Completed(true);
            goToStep(2);
          }
          setDesigModalOpen(false);
        }}
        selectedDesignations={selectedDesignations}
      />
      <ShiftSelector
        open={shiftModalOpen}
        onClose={() => setShiftModalOpen(false)}
        onSave={(selected: Shift[]) => {
          if (selected.length > 0) {
            setSelectedShifts(selected);
            setStep3Completed(true);
            goToStep(3);
          }
          setShiftModalOpen(false);
        }}
        selectedShifts={selectedShifts}
      />
    </Box>
  );
};

type StepCardProps = {
  step: number;
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
  illustration: React.ReactNode;
  active: boolean;
  disabled: boolean;
  success?: boolean;
};

const StepCard = ({
  step,
  title,
  description,
  cta,
  onClick,
  illustration,
  active,
  disabled,
  success = false,
}: StepCardProps) => {
  const navigate = useNavigate();

  const TITLE_STYLE = {
    fontWeight: 600,
    fontSize: 20,
    color: '#181828',
    mb: 1,
    textAlign: 'center',
  };
  const DESC_STYLE = {
    color: '#6c6c77',
    mb: 2,
    fontSize: 15,
    fontWeight: 400,
    minHeight: 48,
    textAlign: 'center',
  };
  const BUTTON_STYLE = {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: 16,
    height: 48,
    bgcolor: PRIMARY_COLOR,
    color: '#fff',
    borderRadius: 2,
    mt: 1,
    '&:hover': { bgcolor: '#5363c6' },
  };

  if (step === 4) {
    const isFinalReady = !disabled;
    return (
      <Paper
        elevation={active ? 6 : 2}
        sx={{
          borderRadius: 4,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: { xs: 2, sm: 3 },
          position: 'relative',
          justifyContent: 'center',
          opacity: isFinalReady ? 1 : 0.4,
        }}
      >
        <Box sx={{ mb: 1.2 }}>
          <Box
            sx={{
              background: '#ececff',
              color: '#6272db',
              fontWeight: 700,
              fontSize: 15,
              px: 3,
              py: 0.8,
              borderRadius: 10,
              mb: 1,
              minWidth: 74,
              textAlign: 'center',
            }}
          >
            {`Step ${step}`}
          </Box>
        </Box>
        <Typography variant='h6' sx={TITLE_STYLE}>
          You're all set!
        </Typography>
        <Typography variant='body2' sx={DESC_STYLE}>
          Organization setup completed. Access your dashboard to start managing.
        </Typography>
        <Box sx={{ mb: 1 }}>{illustration}</Box>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={() => navigate('/dashboard')}
          disabled={!isFinalReady}
          sx={BUTTON_STYLE}
        >
          Go to Dashboard
        </Button>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={active ? 6 : 2}
      sx={{
        borderRadius: 4,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: { xs: 2, sm: 3 },
        opacity: disabled ? 0.6 : 1,
        position: 'relative',
        justifyContent: 'flex-start',
        transition: 'opacity 0.2s',
      }}
    >
      <Box sx={{ mb: 1.2 }}>
        <Box
          sx={{
            background: '#ececff',
            color: '#6272db',
            fontWeight: 700,
            fontSize: 15,
            px: 3,
            py: 0.8,
            borderRadius: 10,
            mb: 1,
            minWidth: 74,
            textAlign: 'center',
          }}
        >
          {`Step ${step}`}
        </Box>
      </Box>
      {success ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            py: 2,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 52, color: '#0c852fff', mb: 1 }} />
          <Typography
            color='#0c852fff'
            fontWeight={400}
            fontSize={16}
            align='center'
          >
            Done!
          </Typography>
          <Typography
            variant='body2'
            align='center'
            sx={{ color: '#000000ff', mt: 0.5, fontSize: 14, fontWeight: 500 }}
          >
            {title} has been successfully completed.
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant='h6' sx={TITLE_STYLE}>
            {title}
          </Typography>
          <Typography variant='body2' sx={DESC_STYLE}>
            {description}
          </Typography>
          <Box sx={{ mb: 1 }}>{illustration}</Box>
          <Button
            fullWidth
            variant='contained'
            onClick={onClick}
            disabled={disabled}
            sx={BUTTON_STYLE}
          >
            {cta}
          </Button>
        </>
      )}
    </Paper>
  );
};

export default SetupWizard;
