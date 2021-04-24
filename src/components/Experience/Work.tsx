import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import { HeadingGrid, List, InvisiText } from 'components/Common';
import { AugAug, FebAug, SE, JSE } from 'components/svg';
import * as TXT from './constants';
import Code from 'containers/Code';

type Props = {
  workItem: import('types').workItem;
} & React.HTMLProps<HTMLDivElement>;

type SvgCompProps = {
  Svg: JSX.Element;
  text: string;
};

const SvgComp = ({ Svg, text }: SvgCompProps) => (
  <Fragment>
    {Svg}
    <InvisiText>{text}</InvisiText>
  </Fragment>
);

// Not my favorite solution for a thing.
const SvgComps = {
  [TXT.JSE]: <SvgComp Svg={<JSE />} text={TXT.JSE} />,
  [TXT.FEB_AUG]: <SvgComp Svg={<FebAug />} text={TXT.FEB_AUG} />,
  [TXT.SE]: <SvgComp Svg={<SE />} text={TXT.SE} />,
  [TXT.AUG_AUG]: <SvgComp Svg={<AugAug />} text={TXT.AUG_AUG} />,
};

const BaseHeadingTypography = styled(Typography)`
  font-size: 0.9rem;
  line-height: 1.66;
`;
const NameTypography = styled(BaseHeadingTypography)`
  white-space: pre;
  font-weight: 600;
`;

const TitleTypography = styled(BaseHeadingTypography)`
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
    <Code fileName={__NAME}>
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
                  {title in SvgComps
                    ? SvgComps[title as keyof typeof SvgComps]
                    : title}
                </TitleTypography>
              }
              date={
                <TitleTypography variant="subtitle1" color="primary">
                  {dates && dates in SvgComps
                    ? SvgComps[dates as keyof typeof SvgComps]
                    : dates}
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
