import React from 'react';
import styled from 'styled-components';
import {
  Grid,
  IconButton,
  Typography as MuiTypography,
} from '@material-ui/core';
import {
  Close as CloseIcon,
  VerticalAlignBottom as VerticalAlignBottomIcon,
} from '@material-ui/icons';

interface Props {
  fileName: string;
  html: string;
  setPosition: React.Dispatch<unknown>;
}

const RootGrid = styled(Grid)`
  white-space: pre;
  max-height: 100vh;
  padding: 10px;
`;

const CodeGrid = styled(Grid)`
  height: calc(100% - 65px);
  flex: 1;
  font-family: 'Inconsolata', monospace;
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--background);
  color: var(--variables);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${(props) => props.theme.palette.background.default};
  border-radius: 3px;
  font-size: 0.9rem;
  line-height: 1.2rem;
`;

const Typography: typeof MuiTypography = styled(MuiTypography)`
  color: ${(props) => props.theme.palette.primary.light};
`;

export const Experience: React.FC<Props> = ({
  fileName,
  html: __html,
  setPosition,
}) => {
  return (
    <RootGrid container direction="column">
      <Grid container item alignItems="baseline">
        <Grid item xs="auto">
          <Typography component="span">File name: </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="caption" component="span">
            {fileName}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <IconButton size="small" onClick={setPosition}>
            <VerticalAlignBottomIcon />
          </IconButton>
        </Grid>
        <Grid item xs="auto">
          <IconButton size="small">
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <CodeGrid item>
        <div dangerouslySetInnerHTML={{ __html }} />
      </CodeGrid>
    </RootGrid>
  );
};

export default Experience;
