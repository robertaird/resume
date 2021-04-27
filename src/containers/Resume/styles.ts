import styled, { css } from 'styled-components';
import { Container, Grid, Paper as MuiPaper } from '@material-ui/core';

interface RootProps {
  'data-shift': boolean;
  'data-drawer-width': number;
}

export const Root = styled(Container)<{ open: boolean }>`
  max-width: 70rem;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  padding: 0px;
  ${(props) =>
    props.open
      ? css`
          max-width: inherit;
          margin-left: 0px;
          margin-right: 0px;
        `
      : ''}
`;

export const MainContent = styled.div<RootProps>`
  max-width: 68rem;
  padding: 20px;
  flex: 4;
  display: grid;
  grid-gap: 0 2.5rem;
  grid-template-columns: 3fr minmax(200px, 1fr);
  grid-template-rows: auto auto 1fr;
  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.values.md - 1}px) {
    grid-template-columns: 1fr;
  }
  margin-right: ${(props) =>
    props['data-shift'] ? 0 : -props['data-drawer-width']}px;
  margin-left: ${(props) => (props['data-shift'] ? '0px' : '1rem')};
  @media print {
    margin-right: 0px;
    margin-left: 0px;
  }
`;

export const Col = styled(Grid)`
  flex-grow: 1;
  max-width: revert;
`;

export const DetailsCol = styled(Col)`
  min-width: 135px;
`;

export const MainCol = styled(Col)`
  order: 0;
  min-width: 430px;
`;

export const Paper = styled(MuiPaper)`
  margin: 2px;
`;
