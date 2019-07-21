import React from "react";
// import { Grid, Typography } from "@material-ui/core";
import Section from "components/Section";
// import Label from "components/DataLabel";
// import Data from "components/DataItem";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  experience: resume["experience"];
} & React.HTMLProps<HTMLDivElement>;

export const Experience = React.forwardRef<HTMLDivElement, Props>(
  ({ experience }, ref) => {
    return (
      <Code code={txt}>
        <Section title="Experience" outerRef={ref}>
          <div />
        </Section>
      </Code>
    );
  }
);

export default Experience;
