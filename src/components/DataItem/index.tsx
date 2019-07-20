import React from "react";
import styled from "styled-components";
import { Grid as MuiGrid, Typography } from "@material-ui/core";

type Props = {};

const Grid = styled(MuiGrid)`
  display: flex;
  white-space: pre;
`;

export const DataItem: React.FC<Props> = ({ children }) => {
  return (
    <Grid item xs={8} justify="flex-end">
      <Typography component="span">{children}</Typography>
    </Grid>
  );
};

export default DataItem;
