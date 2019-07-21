import React from "react";
import { Grid /* Typography */ } from "@material-ui/core";
// import Section from "components/Section";
// import Label from "components/DataLabel";
// import Data from "components/DataItem";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  data: workItem;
};

export const Work: React.FC<Props> = ({ data }) => {
  return (
    <Code code={txt}>
      <Grid container />
    </Code>
  );
};

export default Work;
