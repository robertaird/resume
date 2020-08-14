import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import { HeadingGrid, List } from 'components/Common';
import Code from 'containers/Code';

type Props = {
  workItem: workItem;
} & React.HTMLProps<HTMLDivElement>;

const BaseHeadingTypography = styled(Typography)`
  font-size: 0.9rem;
  line-height: 1.66;
`;
const NameTypography = styled(BaseHeadingTypography)`
  white-space: pre;
  font-weight: 600;
`;

const TitleTypography = styled(BaseHeadingTypography)`
  font-variant: unicase;
  font-weight: 600;
`;

const DescriptionTypography = styled(Typography)`
  padding: 0 0.5rem;
`;

const SubHeadingGrid = styled(HeadingGrid)`
  padding-top: 0.5rem;
`;

export const Work = React.forwardRef<HTMLDivElement, Props>(function Work(
  {
    workItem: {
      company: { name, location, dates: topDates },
      description: topDescription,
      positions,
    },
  },
  ref,
) {
  return (
    <Code>
      <Grid ref={ref} container>
        <HeadingGrid
          title={
            <React.Fragment>
              <NameTypography variant="overline">{name}</NameTypography>
              <NameTypography variant="caption">
                {', '}
                {location}
              </NameTypography>
            </React.Fragment>
          }
          date={<NameTypography variant="caption">{topDates}</NameTypography>}
        />
        <Grid item container>
          <DescriptionTypography variant="subtitle2" align="left">
            {topDescription}
          </DescriptionTypography>
        </Grid>
        {positions.map(({ title, dates, accomplishments, description }) => (
          <React.Fragment key={`${name}-${title}-detail`}>
            <SubHeadingGrid
              title={
                <TitleTypography variant="subtitle1" color="primary">
                  {title}
                </TitleTypography>
              }
              date={
                <TitleTypography variant="subtitle1" color="primary">
                  {dates}
                </TitleTypography>
              }
            />
            <Grid item container>
              <Typography variant="subtitle2">{description}</Typography>
            </Grid>
            <List
              items={accomplishments}
              id={`${name}${title}-accomplishment`}
            />
          </React.Fragment>
        ))}
      </Grid>
    </Code>
  );
});

export default Work;
