import React from "react";
import styled from "styled-components";
import { Grid as MuiGrid, Typography } from "@material-ui/core";
import Code from "../../containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {};

const Grid = styled(MuiGrid)`
  /* min-width to fit content will break instead of ellipsis */
  min-width: min-content;
`;

export const DataLabel: React.FC<Props> = ({ children }) => {
  return (
    <Code code={txt}>
      <Grid item container xs={4} justify="flex-start">
        <Typography color="primary" component="span">
          {children}:{" "}
        </Typography>
      </Grid>
    </Code>
  );
};

export default DataLabel;
