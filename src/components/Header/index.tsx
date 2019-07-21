import React, { useContext } from "react";
import styled from "styled-components";
import {
  CardHeader,
  Grid,
  Typography,
  Switch as MuiSwitch /* , Grid, Typography */
} from "@material-ui/core";
// import Section from "../Section";
// import Label from "../DataLabel";
// import Data from "../DataItem";
import { SourceContext } from "containers/SourceDrawer";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  personal: personal;
} & React.HTMLProps<HTMLDivElement>;

const Switch = styled(MuiSwitch)`
  z-index: 100;
`;

const GridContainer = styled(Grid)`
  margin-top: 16px;
`;

const SwitchItem = styled(Grid)`
  margin: -6px;
`;

export const Experience = React.forwardRef<HTMLDivElement, Props>(
  ({ personal }, ref) => {
    const { handleOpen } = useContext(SourceContext);
    return (
      <Code code={txt}>
        <CardHeader
          ref={ref}
          title={`${personal.firstName} ${personal.lastName}`}
          titleTypographyProps={{ color: "primary" }}
          subheader={personal.title}
          action={
            <GridContainer container direction="column">
              <SwitchItem item>
                <Switch size="small" onChange={handleOpen} />
              </SwitchItem>
              <Grid item>
                <Typography variant="caption">Toggle Inspector</Typography>
              </Grid>
            </GridContainer>
          }
        />
      </Code>
    );
  }
);

export default Experience;
