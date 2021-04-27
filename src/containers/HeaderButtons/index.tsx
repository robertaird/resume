import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { SourceContext } from 'containers/SourceProvider';
import { ThemeContext } from 'containers/ThemeProvider';
import Code from 'containers/Code';
import {
  GridContainer,
  GridItem,
  Switch,
  SwitchItem,
  SwitchTypography,
} from './styles';

export const HeaderButtons = React.forwardRef<HTMLDivElement>(
  function HeaderButtons(_props, ref) {
    const { handleOpen } = useContext(SourceContext);
    const { toggleTheme } = useContext(ThemeContext);
    return (
      <Code fileName={__NAME}>
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
