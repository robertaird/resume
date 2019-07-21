import React from "react";
import styled from "styled-components";
import { Grid as MuiGrid, Typography } from "@material-ui/core";

type Props = React.HTMLProps<HTMLDivElement>;

const Grid = styled(MuiGrid)`
  align-self: baseline;
`;

export const Label = React.forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    return (
      <Grid ref={ref} item>
        <Typography color="primary" component="span">
          {children}:{" "}
        </Typography>
      </Grid>
    );
  }
);

export default Label;
