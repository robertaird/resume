import React from 'react';
import styled from 'styled-components';
import { Grid as MuiGrid, Typography } from '@material-ui/core';
import Code from 'containers/Code';
// @ts-ignore
import txt from '!raw-loader!./SpanNoWrap.tsx';

const Grid = styled(MuiGrid)``;

export const SpanNoWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function SpanNoWrap({ children }, ref) {
  return (
    <Code code={txt}>
      <Grid ref={ref} item container xs={'auto'} justify={'center'}>
        <Typography noWrap variant="body2" component="span">
          {children}
        </Typography>
      </Grid>
    </Code>
  );
});
