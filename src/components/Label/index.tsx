import React from "react";
import styled from "styled-components";
import { Grid as MuiGrid, Typography } from "@material-ui/core";

type Props = {};

const Grid = styled(MuiGrid)`
  align-self: baseline;
`;

export const Label: React.FC<Props> = ({ children }) => {
  return (
    <Grid item>
      <Typography color="primary" component="span">
        {children}:{" "}
      </Typography>
    </Grid>
  );
};

export default Label;
