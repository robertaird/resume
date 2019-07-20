import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Label from "../DataLabel";
import Data from "../DataItem";

type Props = {
  data: personal;
};

export const About: React.FC<Props> = ({ data: { links } }) => {
  return (
    <Grid container>
      <Typography variant="h6">About</Typography>
      <Grid item container alignItems="baseline">
        {links.map(link => (
          <Grid key={`link-${link[0]}`} item container direction="row">
            <Label>{link[0]}</Label>
            <Data>{link[1]}</Data>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default About;
