import React from "react";
import { CardHeader /* , Grid, Typography */ } from "@material-ui/core";
// import Section from "../Section";
// import Label from "../DataLabel";
// import Data from "../DataItem";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  data: personal;
};

export const Experience: React.FC<Props> = ({ data }) => {
  return (
    <Code code={txt}>
      <CardHeader
        title={`${data.firstName} ${data.lastName}`}
        subheader={data.title}
      />
    </Code>
  );
};

export default Experience;
