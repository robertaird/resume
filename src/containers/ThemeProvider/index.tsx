import React, {
  Fragment,
  createContext,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import createTheme, { DARK, LIGHT } from 'style/theme';

type themeType = typeof DARK | typeof LIGHT;
type theme = ReturnType<typeof createTheme>;

const defaultThemeType: themeType = DARK;

export const ThemeContext = createContext({
  toggleTheme: () => {},
});

const GlobalStyle = createGlobalStyle<{ theme: theme }>`
      body {
        background: ${props => props.theme.palette.background.default};
          color: ${props => props.theme.palette.text.primary};
        }
`;

export const ThemeProvider: React.FC = ({ children }) => {
  const [type, setThemeType] = useState<themeType>(defaultThemeType);
  const setTheme = useCallback(() => createTheme(type), [type]);
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
