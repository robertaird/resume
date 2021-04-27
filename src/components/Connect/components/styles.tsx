import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const IconGrid = styled(Grid)`
  flex-grow: 0;
  max-width: 30px;
  flex-basis: 30px;
`;

export const TextGrid = styled(Grid)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    && {
      max-width: fit-content;
    }
  }
`;

export const SubSection = styled(Grid)`
  width: 100%;
  padding: 0 0.5rem;
  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-left: auto;
    max-width: 395px;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    && {
      max-width: 80vw;
      justify-content: space-evenly;
    }
  }
`;

const BareRowItem: React.FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <Grid className={className} xs item container direction="row">
    {children}
  </Grid>
);

export const RowItem = styled(BareRowItem)`
  min-height: 12px;
  min-width: 12.5rem;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    && {
      max-width: fit-content;
      justify-content: center;
      @media print {
        justify-content: unset;
      }
    }
  }
`;
