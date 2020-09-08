import React from 'react';
import { Grid } from '@material-ui/core';
import {
  HeadingGridPadded,
  PaddedTypography,
  Section,
} from 'components/Common';
import Code from 'containers/Code';

type SectionProps = Pick<
  React.ComponentPropsWithoutRef<typeof Section>,
  'padding' | 'headerRadius'
>;

type otherItems = otherItem[];
type Props = {
  otherExperience: otherItems;
} & SectionProps &
  React.HTMLProps<HTMLDivElement>;

const Item = ({ item }: { item: otherItem }) => {
  if (typeof item === 'string') {
    return (
      <PaddedTypography paragraph variant="body2" align="left">
        {item}
      </PaddedTypography>
    );
  }
  return (
    <HeadingGridPadded paragraph title={item.description} date={item.date} />
  );
};

export const RelatedExperience = React.forwardRef<HTMLDivElement, Props>(
  function RelatedExperience({ otherExperience, headerRadius, padding }, ref) {
    return (
      <Code>
        <Section
          title="Related Experience"
          outerRef={ref}
          headerRadius={headerRadius}
          padding={padding}
        >
          {otherExperience.map((item, i) => (
            <Grid key={`skills-${i}`} item container direction="row">
              <Item item={item} />
            </Grid>
          ))}
        </Section>
      </Code>
    );
  },
);

export default RelatedExperience;
