import React from 'react';
import styled from 'styled-components';
import { Grid, Typography as MuiTypography } from '@material-ui/core';

interface Props {
  fileName: string;
  html: string;
} // & React.HTMLProps<HTMLDivElement>;

const RootGrid = styled(Grid)`
  white-space: pre;
  max-height: 100vh;
  padding: 10px;
`;

const CodeGrid = styled(Grid)`
  height: calc(100% - 70px);
  font-family: 'Inconsolata', monospace;
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--background);
  color: var(--variables);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${props => props.theme.palette.background.default};
  border-radius: 3px;
  font-size: 0.9rem;
  line-height: 1.2rem;
`;

const Typography: typeof MuiTypography = styled(MuiTypography)`
  color: ${props => props.theme.palette.primary.light};
`;

export const Experience: React.FC<Props> = ({ fileName, html: __html }) => {
  return (
    <RootGrid container direction="column">
      <Grid item>
        <Typography component="span">Code:</Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption" component="span">
          {fileName}
        </Typography>
      </Grid>
      <CodeGrid item>
        <div dangerouslySetInnerHTML={{ __html }} />
      </CodeGrid>
    </RootGrid>
  );
};

export default Experience;
