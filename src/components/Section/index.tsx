import React from "react";
import styled from "styled-components";
import { Grid as MuiGrid, Typography } from "@material-ui/core";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  title: string;
  outerRef?: React.Ref<any>;
} & React.HTMLProps<HTMLDivElement>;

const Grid = styled(MuiGrid)`
  padding: 3px;
`;

const SectionHeader = styled(Typography)`
  width: 100%;
  height: 32px;
  margin-bottom: 4px;
  background: ${props => props.theme.palette.primary.dark};
`;

export const Section = React.forwardRef<HTMLDivElement, Props>(
  ({ children, title, outerRef }, ref) => {
    return (
      <Code code={txt}>
        <Grid container ref={outerRef}>
          <SectionHeader align="center" variant="h6">
            {title}
          </SectionHeader>
          <Grid ref={ref} item container alignItems="baseline">
            {children}
          </Grid>
        </Grid>
      </Code>
    );
  }
);

export default Section;
