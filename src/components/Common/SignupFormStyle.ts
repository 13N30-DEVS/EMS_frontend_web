export const COMMON_STYLES = {
  field: {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      transition: 'all 0.3s ease',
      backgroundColor: '#fafafa',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3F51B5',
      },
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
    '& .MuiInputLabel-root.Mui-focused': { color: '#6a8ee0' },
  },
  button: {
    py: 1.5,
    backgroundColor: '#3F51B5',
    mt: 2,
    borderRadius: 2,
    fontWeight: 700,
    fontSize: 16,
    textTransform: 'none',
    boxShadow: '0px 6px 16px #3F51B580',
    '&:disabled': {
      backgroundColor: '#9fa8da',
    },
  },
};
