import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import { PaddedTypography, Section } from 'components/Common';
import Code from 'containers/Code';

type SectionProps = Pick<
  React.ComponentPropsWithoutRef<typeof Section>,
  'padding' | 'headerRadius'
>;

type Props = {
  professionalSkills: import('types').skillsItem[];
} & SectionProps &
  React.HTMLProps<HTMLDivElement>;

const TitleTypography = styled(Typography)`
  line-height: 1.66;
  width: 100%;
`;

export const Skills = React.forwardRef<HTMLDivElement, Props>(function Skills(
  { professionalSkills, headerRadius, padding },
  ref,
) {
  return (
    <Code fileName={__NAME}>
      <Section
        title="Technical Skills"
        outerRef={ref}
        headerRadius={headerRadius}
        padding={padding}
      >
        {professionalSkills.map(({ title, skills }, i) => (
          <Grid key={`skills-${i}`} item container direction="row">
            <TitleTypography variant="overline" align="left">
              {title}
            </TitleTypography>
            <PaddedTypography paragraph variant="body2" align="left">
              {skills.join(', ')}
            </PaddedTypography>
          </Grid>
        ))}
      </Section>
    </Code>
  );
});

export default Skills;
