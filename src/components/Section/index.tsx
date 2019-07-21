import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Code from "../../containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  title: string;
};

export const Section: React.FC<Props> = ({ children, title }) => {
  return (
    <Code code={txt}>
      <Grid container>
        <Typography variant="h6">{title}</Typography>
        <Grid item container alignItems="baseline">
          {children}
        </Grid>
      </Grid>
    </Code>
  );
};

export default Section;
