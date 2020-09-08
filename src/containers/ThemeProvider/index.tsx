import React, { Fragment, createContext, useCallback, useState } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import createTheme, { DARK, LIGHT, theme } from 'style/theme';

type ThemeProps = {
  disableResponsive: boolean | string | null;
  children: Omit<React.ReactNode, 'undefined'>;
};
type themeType = typeof DARK | typeof LIGHT;
// enable types for theme within styled-components
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends theme {}
}

// check if user has dark theme enabled
const defaultThemeType: themeType = window.matchMedia(
  '(prefers-color-scheme: dark)',
).matches
  ? DARK
  : LIGHT;

export const ThemeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
});

const GlobalStyle = createGlobalStyle<{ theme: theme }>`
      body {
        background: ${(props) => props.theme.palette.background.default};
          color: ${(props) => props.theme.palette.text.primary};
        }
`;

export const ThemeProvider = ({ children, disableResponsive }: ThemeProps) => {
  const [type, setThemeType] = useState<themeType>(defaultThemeType);
  const setTheme = useCallback(
    () =>
      createTheme(
        type,
        typeof disableResponsive === 'string' || !!disableResponsive,
      ),
    [type, disableResponsive],
  );
  const theme = setTheme();
  const toggleTheme = () => {
    setThemeType(type === DARK ? LIGHT : DARK);
  };
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline>
            <StyledThemeProvider theme={theme}>
              <Fragment>
                <GlobalStyle theme={theme} />
                {children}
              </Fragment>
            </StyledThemeProvider>
          </CssBaseline>
        </MuiThemeProvider>
      </StylesProvider>
    </ThemeContext.Provider>
  );
};
