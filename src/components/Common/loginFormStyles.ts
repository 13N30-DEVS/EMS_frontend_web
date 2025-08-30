import { useMemo } from 'react';

const PRIMARY_COLOR = '#3F51B5';

export const useContainerStyles = () =>
  useMemo(
    () => ({
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: "url('/assets/bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }),
    []
  );

export const usePaperStyles = () =>
  useMemo(
    () => ({
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      maxWidth: 900,
      width: '100%',
      borderRadius: 3,
    }),
    []
  );

export const useFieldStyles = () =>
  useMemo(
    () => ({
      mb: 2,
      '& .MuiOutlinedInput-root': {
        borderRadius: 3,
        backgroundColor: '#fafafa',
        '&:hover fieldset': { borderColor: PRIMARY_COLOR },
        '&.Mui-focused fieldset': { borderColor: '#6a8ee0' },
      },
    }),
    []
  );

export const useButtonStyles = () =>
  useMemo(
    () => ({
      py: 1.2,
      backgroundColor: PRIMARY_COLOR,
      '&:hover': { backgroundColor: '#303F9F' },
      fontWeight: 700,
      borderRadius: 2,
    }),
    []
  );

export const useTitleStyles = () =>
  useMemo(
    () => ({
      fontSize: { xs: 20, sm: 24 },
      fontWeight: 700,
    }),
    []
  );
