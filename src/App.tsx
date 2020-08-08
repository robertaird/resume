import React from 'react';
import styled from 'styled-components';
import './style/prism-plastic.css';
import './App.css';
import data from './data/resume.json';
import { ThemeProvider } from 'containers/ThemeProvider';
import CodeProvider from 'containers/Code/context';
import SourceProvider from 'containers/SourceProvider';
import Resume from './containers/Resume';

const RootDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CodeProvider>
        <SourceProvider>
          {(open, code) => (
            <RootDiv className="App">
              <Resume open={open} code={code} data={data} />
            </RootDiv>
          )}
        </SourceProvider>
      </CodeProvider>
    </ThemeProvider>
  );
};

export default App;
