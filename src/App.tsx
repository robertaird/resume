import React, { Fragment } from "react";
import styled from "styled-components";
import { createMuiTheme, CssBaseline, colors } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle
} from "styled-components";
import Resume from "./containers/Resume";
import "./App.css";
import data from "./data/resume.json";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: { default: "#1a1a1a" },
    primary: colors.teal
  }
});
const RootDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  body {
    background: ${props => props.theme.palette.background.default};
    color: ${props => props.theme.palette.text.primary};
  }
`;
console.log(theme);
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <StyledThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyle />
            <RootDiv className="App">
              <Resume data={data} />
            </RootDiv>
          </Fragment>
        </StyledThemeProvider>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
