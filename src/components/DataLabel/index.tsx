import React from "react";
import styled from "styled-components";
import { Grid as MuiGrid, Typography } from "@material-ui/core";

type Props = {};

const Grid = styled(MuiGrid)`
  display: flex;
`;

export const DataLabel: React.FC<Props> = ({ children }) => {
  return (
    <Grid item xs={4} justify="flex-start">
      <Typography color="primary" component="span">
        {children}:{" "}
      </Typography>
    </Grid>
  );
};

export default DataLabel;
