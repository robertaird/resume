import React from 'react';
import styled from 'styled-components';
import './style/prism-plastic.css';
import './App.css';
import data from './data/resume.json';
import { ThemeProvider } from 'containers/ThemeProvider';
import Resume from './containers/Resume';

const RootDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RootDiv className="App">
        <Resume data={data} />
      </RootDiv>
    </ThemeProvider>
  );
};

export default App;
