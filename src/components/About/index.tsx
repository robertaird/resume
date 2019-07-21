import React from "react";
import { Grid /* Typography */ } from "@material-ui/core";
import Section from "components/Section";
import Label from "components/DataLabel";
import Data from "components/DataItem";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  data: personal;
};

export const About: React.FC<Props> = ({ data: { links } }) => {
  return (
    <Code code={txt}>
      <Section title="About">
        {links.map(link => (
          <Grid key={`link-${link[0]}`} item container direction="row">
            <Label>{link[0]}</Label>
            <Data>{link[1]}</Data>
          </Grid>
        ))}
      </Section>
    </Code>
  );
};

export default About;
