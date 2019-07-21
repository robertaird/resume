import React from "react";
import styled from "styled-components";
import { Grid as MuiGrid, Typography } from "@material-ui/core";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  fullWidth?: boolean;
} & React.HTMLProps<HTMLDivElement>;

const Grid = styled(MuiGrid)``;

export const DataItem = React.forwardRef<HTMLDivElement, Props>(
  ({ children, fullWidth }, ref) => {
    return (
      <Code code={txt}>
        <Grid
          ref={ref}
          item
          container
          xs={fullWidth ? 12 : 8}
          justify={fullWidth ? "center" : "flex-end"}
        >
          <Typography noWrap component="span">
            {children}
          </Typography>
        </Grid>
      </Code>
    );
  }
);

export default DataItem;
