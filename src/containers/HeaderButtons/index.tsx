import React, { useContext } from 'react';
import styled from 'styled-components';
import { Grid, Typography, Switch as MuiSwitch } from '@material-ui/core';
import { SourceContext } from 'containers/SourceProvider';
import { ThemeContext } from 'containers/ThemeProvider';
import Code from 'containers/Code';

const Switch = styled(MuiSwitch)`
  z-index: 1000;
`;

const GridContainer = styled(Grid)`
  grid-column: 1/-1;
  width: 200px;
  margin-left: auto;
  margin-bottom: 16px;
`;

const GridItem = styled(Grid)`
  width: 100px;
  margin-top: 16px;
`;

const SwitchItem = styled(Grid)`
  margin: -6px;
  @media print {
    display: none;
  }
`;

const SwitchTypography = styled(Typography)`
  @media print {
    display: none;
  }
`;

export const HeaderButtons = React.forwardRef<HTMLDivElement>(
  function HeaderButtons(_props, ref) {
    const { handleOpen } = useContext(SourceContext);
    const { toggleTheme } = useContext(ThemeContext);
    return (
      <Code>
        <GridContainer ref={ref} id="togglers" container>
          <GridItem container item direction="column">
            <SwitchItem item>
              <Switch size="small" onChange={handleOpen} />
            </SwitchItem>
            <Grid item>
              <SwitchTypography color="textSecondary" variant="caption">
                Code Inspector
              </SwitchTypography>
            </Grid>
          </GridItem>
          <GridItem container item direction="column">
            <SwitchItem item>
              <Switch id="toggle-theme" size="small" onChange={toggleTheme} />
            </SwitchItem>
            <Grid item>
              <SwitchTypography color="textSecondary" variant="caption">
                Theme
              </SwitchTypography>
            </Grid>
          </GridItem>
        </GridContainer>
      </Code>
    );
  },
);

export default HeaderButtons;
