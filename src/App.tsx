import React, { Fragment } from "react";
import styled from "styled-components";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, StylesProvider } from "@material-ui/styles";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle
} from "styled-components";
// import "prismjs/themes/prism-dark.css";
import "./style/prism-plastic.css";
import "./App.css";
import data from "./data/resume.json";
import theme from "./style/theme";
import Resume from "./containers/Resume";

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
    <StylesProvider injectFirst>
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
    </StylesProvider>
  );
};

export default App;
