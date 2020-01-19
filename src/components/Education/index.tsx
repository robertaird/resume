import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import { HeadingGrid, PaddedTypography, Section } from 'components/Common';
import Code from 'containers/Code';

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
  function Education({ education, headerRadius, padding }, ref) {
    return (
      <Code>
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
              <HeadingGrid
                title={
                  <PaddedTypography variant="body2">{program}</PaddedTypography>
                }
                date={
                  <PaddedTypography variant="body2">{date}</PaddedTypography>
                }
              />
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
