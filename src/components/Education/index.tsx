import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import { PaddedTypography, Section } from 'components/Common';
import Code from 'containers/Code';
// @ts-ignore
import txt from '!raw-loader!./index.tsx';

type SectionProps = Pick<
  React.ComponentPropsWithoutRef<typeof Section>,
  'padding' | 'headerRadius'
>;

type Props = {
  education: resume['education'];
} & SectionProps &
  React.HTMLProps<HTMLDivElement>;

const ContainerGrid = styled(Grid)`
  padding-bottom: 0.5rem;
`;

const TitleTypography = styled(Typography)`
  line-height: 1.66;
`;

export const Education = React.forwardRef<HTMLDivElement, Props>(
  ({ education, headerRadius, padding }, ref) => {
    return (
      <Code code={txt}>
        <Section
          title="Education"
          outerRef={ref}
          headerRadius={headerRadius}
          padding={padding}
        >
          {education.map(({ location, program, description, date }, i) => (
            <ContainerGrid
              key={`education-${i}`}
              item
              container
              direction="row"
            >
              <Grid item container xs={12}>
                <TitleTypography variant="overline" align="left">
                  {location}
                </TitleTypography>
              </Grid>
              <Grid item container xs={8}>
                <PaddedTypography variant="body2" align="left">
                  {program}
                </PaddedTypography>
              </Grid>
              <Grid item container xs={4} justify="flex-end">
                <PaddedTypography variant="body2" align="right">
                  {date}
                </PaddedTypography>
              </Grid>
              <Grid item container xs={12}>
                <PaddedTypography variant="caption" align="left">
                  {description}
                </PaddedTypography>
              </Grid>
            </ContainerGrid>
          ))}
        </Section>
      </Code>
    );
  },
);

export default Education;
