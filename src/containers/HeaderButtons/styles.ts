import styled from 'styled-components';
import { Grid, Typography, Switch as MuiSwitch } from '@material-ui/core';

export const Switch = styled(MuiSwitch)`
  z-index: 1000;
`;

export const GridContainer = styled(Grid)`
  grid-column: 1/-1;
  width: 200px;
  margin-left: auto;
  margin-bottom: 16px;
`;

export const GridItem = styled(Grid)`
  width: 100px;
  margin-top: 16px;
`;

export const SwitchItem = styled(Grid)`
  margin: -6px;
  @media print {
    display: none;
  }
`;

export const SwitchTypography = styled(Typography)`
  @media print {
    display: none;
  }
`;
