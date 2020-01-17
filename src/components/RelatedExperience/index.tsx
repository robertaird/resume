import React from 'react';
import { Grid } from '@material-ui/core';
import { PaddedTypography, Section } from 'components/Common';
import Code from 'containers/Code';
// @ts-ignore
import txt from '!raw-loader!./index.tsx';

type SectionProps = Pick<
  React.ComponentPropsWithoutRef<typeof Section>,
  'padding' | 'headerRadius'
>;

type Props = {
  otherExperience: resume['experience']['other'];
} & SectionProps &
  React.HTMLProps<HTMLDivElement>;

export const RelatedExperience = React.forwardRef<HTMLDivElement, Props>(
  function RelatedExperience({ otherExperience, headerRadius, padding }, ref) {
    return (
      <Code code={txt}>
        <Section
          title="Related Experience"
          outerRef={ref}
          headerRadius={headerRadius}
          padding={padding}
        >
          {otherExperience.map((item, i) => (
            <Grid key={`skills-${i}`} item container direction="row">
              <PaddedTypography paragraph variant="body2" align="left">
                {item}
              </PaddedTypography>
            </Grid>
          ))}
        </Section>
      </Code>
    );
  },
);

export default RelatedExperience;
