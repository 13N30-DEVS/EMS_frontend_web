// src/components/Common/SignupFormStyle.ts

export const COMMON_STYLES = {
  field: {
    mb: { xs: 1.1, sm: 2 },
    '& .MuiOutlinedInput-root': {
      borderRadius: { xs: 2, sm: 3 },
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      fontSize: { xs: 13.5, sm: 16 },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3F51B5',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#6a8ee0',
        boxShadow: '0 0 4px rgba(106,142,224,0.2)',
      },
    },
    '& .MuiInputBase-input': {
      padding: { xs: '10px 11px', sm: '12px 14px' },
      fontSize: { xs: 13.5, sm: 16 },
      fontWeight: 500,
      '::placeholder': {
        fontSize: { xs: 12, sm: 13 },
        fontWeight: 500,
        color: '#888',
        opacity: 1,
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: { xs: 13.2, sm: 16 },
      fontWeight: 500,
      color: '#000',
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6a8ee0' },
  },
  button: {
    py: { xs: 1.1, sm: 1.5 },
    backgroundColor: '#3F51B5',
    mt: { xs: 1.5, sm: 2 },
    borderRadius: 2,
    fontWeight: 700,
    fontSize: { xs: 15, sm: 16 },
    minHeight: { xs: 40, sm: 48 },
    textTransform: 'none',
    boxShadow: '0px 6px 16px #3F51B580',
    '&:disabled': {
      backgroundColor: '#9fa8da',
    },
  },
};
