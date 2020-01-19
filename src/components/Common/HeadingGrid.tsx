import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import Code from 'containers/Code';

type TypographyProps = React.ComponentProps<typeof Typography>;

interface Props {
  title: React.ReactElement;
  date: React.ReactElement;
}

const TitleContainer = styled(Grid)`
  flex: 1 1 0;
`;

const DateContainer = styled(Grid)`
  flex: 0 0 auto;
  max-width: fit-content;
`;

export const HeadingGrid = React.forwardRef<HTMLDivElement, Props>(
  function HeadingGrid({ title, date }, ref) {
    return (
      <Code>
        <Grid ref={ref} item container xs={12}>
          <TitleContainer item container justify="flex-start">
            {React.cloneElement(title, {
              ...title.props,
              align: 'left',
            } as TypographyProps)}
          </TitleContainer>
          <DateContainer item container justify="flex-end" zeroMinWidth>
            {React.cloneElement(date, {
              ...date.props,
              align: 'right',
              noWrap: true,
            } as TypographyProps)}
          </DateContainer>
        </Grid>
      </Code>
    );
  },
);

export default HeadingGrid;
