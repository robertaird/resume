import React from "react";
import styled from "styled-components";
import { Grid as MuiGrid, Typography } from "@material-ui/core";
import Code from "../../containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {};

const Grid = styled(MuiGrid)``;

export const DataItem: React.FC<Props> = ({ children }) => {
  return (
    <Code code={txt}>
      <Grid item container xs={8} justify="flex-end">
        <Typography noWrap component="span">
          {children}
        </Typography>
      </Grid>
    </Code>
  );
};

export default DataItem;
