import { SxProps, Theme } from '@mui/material/styles';

const primaryColor = '#3F51B5';

export const containerStyles: SxProps<Theme> = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: 2,
  backgroundImage: "url('/assets/bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

export const paperStyles: SxProps<Theme> = {
  width: '100%',
  maxWidth: 900,
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  borderRadius: 4,
  overflow: 'hidden',
  boxShadow: '0 12px 24px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.08)',
  backgroundColor: '#fff',
};

export const leftSectionStyles: SxProps<Theme> = {
  flex: { xs: '1 1 100%', md: '0 0 45%' },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  p: { xs: 2, md: 4 },
  backgroundColor: '#fff',
};

export const imageStyles: SxProps<Theme> = {
  width: 280,
  mb: 4,
  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
  borderRadius: 2,
};

export const headingStyles: SxProps<Theme> = {
  fontSize: 24,
  fontWeight: 700,
  color: '#171717',
  width: '100%',
  mb: 1.5,
  textAlign: 'left',
};

export const descriptionStyles: SxProps<Theme> = {
  fontSize: 16,
  fontWeight: 500,
  color: '#757575',
  width: '100%',
  maxWidth: 370,
  lineHeight: 1.5,
  textAlign: 'left',
};

export const rightSectionStyles: SxProps<Theme> = {
  flex: { xs: '1 1 100%', md: '0 0 55%' },
  p: { xs: 4, md: 5 },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#fff',
};

export const rightHeadingStyles: SxProps<Theme> = {
  fontSize: 24,
  fontWeight: 700,
  color: '#171717',
  mb: 1.2,
  mt: { xs: 0, md: 2 },
};

export const rightDescriptionStyles: SxProps<Theme> = {
  fontSize: 16,
  fontWeight: 500,
  color: '#888',
  mb: 3,
  maxWidth: 360,
  whiteSpace: 'normal',
  textAlign: 'left',
};

export const textFieldStyles: SxProps<Theme> = {
  mb: 3,
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    transition: 'all 0.3s ease',
    backgroundColor: '#fafafa',
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: primaryColor },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#6a8ee0',
      boxShadow: '0 0 4px rgba(106,142,224,0.2)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
    fontSize: 16,
    fontWeight: 500,
    '::placeholder': {
      fontSize: 13,
      fontWeight: 500,
      color: '#888',
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: 16,
    fontWeight: 500,
    color: '#000',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: primaryColor,
  },
};

// Function (not typed as SxProps) that returns styles conditionally
export const buttonStyles = (isEnabled: boolean) => ({
  backgroundColor: isEnabled ? primaryColor : '#ddd',
  color: isEnabled ? '#fff' : '#888',
  fontWeight: 700,
  py: 1.6,
  borderRadius: 1.2,
  boxShadow: isEnabled ? `0 4px 18px 0 ${primaryColor}20` : 'none',
  textTransform: 'none',
  mt: 2,
});

export const footerTextStyles: SxProps<Theme> = {
  textAlign: 'center',
  mt: 3,
  fontSize: 16,
  fontWeight: 700,
  color: '#000',
};
