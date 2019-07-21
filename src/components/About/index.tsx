import React from "react";
import styled from "styled-components";
import { Grid, Typography } from "@material-ui/core";
import Section from "components/Section";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  personal: personal;
} & React.HTMLProps<HTMLDivElement>;

const Paragraph = styled(Typography)`
  padding-bottom: 0.8rem;
`;

export const About = React.forwardRef<HTMLDivElement, Props>(
  ({ personal: { about } }, ref) => {
    return (
      <Code code={txt}>
        <Section outerRef={ref} title="About">
          {about.map((paragraph, i) => (
            <Grid key={`about-${i}`} item container direction="row">
              <Paragraph>{paragraph}</Paragraph>
            </Grid>
          ))}
        </Section>
      </Code>
    );
  }
);

export default About;
