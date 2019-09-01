import { createMuiTheme, colors } from '@material-ui/core';

export const DARK = 'dark';
export const LIGHT = 'light';
const createTheme = (type?: typeof DARK | typeof LIGHT) =>
  createMuiTheme({
    palette: {
      type,
      background:
        type === DARK
          ? { default: '#1a1a1a', paper: '#3a3a3a' }
          : { default: 'fff' },
      primary: colors.blue,
      secondary: { main: colors.amber[700] },
    },
    overrides: {
      MuiTooltip: {
        tooltip: {
          maxWidth: 600,
          backgroundColor: '#21252b',
        },
      },
      MuiTypography: {
        paragraph: {
          marginBottom: '0.8rem',
        },
      },
    },
  });

export default createTheme;
