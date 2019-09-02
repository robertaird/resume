import React from 'react';
import { Grid } from '@material-ui/core';
import Code from 'containers/Code';
// @ts-ignore
import txt from '!raw-loader!./HeadingGrid.tsx';

interface Props {
  title: React.ReactNode;
  date: React.ReactNode;
}

export const HeadingGrid = React.forwardRef<HTMLDivElement, Props>(
  ({ title, date }, ref) => (
    <Code code={txt}>
      <Grid ref={ref} item container>
        <Grid item container xs={9}>
          {title}
        </Grid>
        <Grid item container justify="flex-end" xs={3}>
          {date}{' '}
        </Grid>
      </Grid>
    </Code>
  ),
);

export default HeadingGrid;
