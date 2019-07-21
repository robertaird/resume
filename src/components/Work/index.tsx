import React from "react";
import { Grid /* Typography */ } from "@material-ui/core";
// import Section from "components/Section";
// import Label from "components/DataLabel";
// import Data from "components/DataItem";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  workItem: workItem;
} & React.HTMLProps<HTMLDivElement>;

export const Work = React.forwardRef<HTMLDivElement, Props>(
  ({ workItem }, ref) => {
    return (
      <Code code={txt}>
        <Grid ref={ref} container />
      </Code>
    );
  }
);

export default Work;
