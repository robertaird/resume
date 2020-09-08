import { createMuiTheme, colors } from '@material-ui/core';

export type theme = ReturnType<typeof createMuiTheme>;
export const DARK = 'dark';
export const LIGHT = 'light';
const printTextGray = {
  '@media print': {
    color: '#212121',
  },
};
const printTextBlack = {
  '@media print': {
    color: '#000000',
  },
};

const noResponsiveBreakpoints = (() =>
  (['xs', 'sm', 'md', 'lg', 'xl'] as const).reduce((seed, current) => {
    seed[current] = 0;
    return seed;
  }, {} as theme['breakpoints']['values']))();

const createTheme = (
  type?: typeof DARK | typeof LIGHT,
  disableResponsive?: boolean,
) => {
  return createMuiTheme({
    palette: {
      type,
      background:
        type === DARK
          ? { default: '#1a1a1a', paper: '#3a3a3a' }
          : { default: '#f8f8f8', paper: '#ccc' },
      primary: { main: colors.lightBlue[500] },
      secondary: {
        main: type === DARK ? colors.amber[700] : colors.amber[900],
      },
    },
    overrides: {
      MuiTooltip: {
        tooltip: {
          maxWidth: 600,
          backgroundColor: '#21252b',
        },
      },
      MuiTypography: {
        root: printTextGray,
        caption: printTextBlack,
        h6: printTextBlack,
        overline: printTextBlack,
        colorTextPrimary: printTextBlack,
        colorTextSecondary: printTextBlack,
        paragraph: {
          marginBottom: '0.8rem',
        },
      },
    },
    ...(disableResponsive
      ? { breakpoints: { values: noResponsiveBreakpoints } }
      : {}),
  });
};

export default createTheme;
