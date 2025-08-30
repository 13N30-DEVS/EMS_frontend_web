import { createTheme } from '@mui/material/styles';

const workspaceFormTheme = createTheme({
  typography: {
    h5: { fontSize: 24, fontWeight: 700 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14, color: '#555' },
  },
  components: {
    MuiTextField: { defaultProps: { size: 'medium' } },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: 16, color: '#666', lineHeight: 1.1 },
        sizeSmall: { fontSize: 16 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { fontSize: 16 },
        input: {
          paddingTop: 14,
          paddingBottom: 14,
          paddingLeft: 12,
          paddingRight: 12,
        },
      },
    },
  },
});

export default workspaceFormTheme;
