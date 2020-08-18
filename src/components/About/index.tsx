import React from 'react';
import { Grid } from '@material-ui/core';
import { PaddedTypography, Section } from 'components/Common';
import Code from 'containers/Code';

type SectionProps = Pick<
  React.ComponentPropsWithoutRef<typeof Section>,
  'padding' | 'headerRadius'
>;

interface Props extends React.HTMLProps<HTMLDivElement>, SectionProps {
  personal: import('types').personal;
}

export const About = React.forwardRef<HTMLDivElement, Props>(function About(
  { personal: { about }, padding, headerRadius },
  ref,
) {
  return (
    <Code fileName={__NAME}>
      <Section
        outerRef={ref}
        title="About"
        headerRadius={headerRadius}
        padding={padding}
      >
        {about.map((paragraph, i) => (
          <Grid key={`about-${i}`} item container direction="row">
            <PaddedTypography paragraph variant="body2" align="left">
              {paragraph}
            </PaddedTypography>
          </Grid>
        ))}
      </Section>
    </Code>
  );
});

export default About;
