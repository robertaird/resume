import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Section from "../Section";
import Label from "../DataLabel";
import Data from "../DataItem";
import Code from "../../containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  data: personal;
};

export const Experience: React.FC<Props> = ({ data }) => {
  return (
    <Code code={txt}>
      <div />
    </Code>
  );
};

export default Experience;
