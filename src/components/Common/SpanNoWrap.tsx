import React from 'react';
import styled from 'styled-components';
import { Grid as MuiGrid, GridProps, Typography } from '@material-ui/core';
import Code from 'containers/Code';

const Grid = styled(MuiGrid)``;

export const SpanNoWrap = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; justify?: GridProps['justify'] }
>(function SpanNoWrap({ children, justify = 'center' }, ref) {
  return (
    <Code>
      <Grid ref={ref} item container xs="auto" justify={justify}>
        <Typography noWrap variant="body2" component="span">
          {children}
        </Typography>
      </Grid>
    </Code>
  );
});
