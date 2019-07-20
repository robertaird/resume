import React from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import About from "../../components/About";

type ResumeProps = {
  data: resume;
};

interface ResumeState {}

const RootGrid = styled(Grid)`
  padding: 20px;
`;

class Resume extends React.PureComponent<ResumeProps, ResumeState> {
  render() {
    const { data } = this.props;
    return (
      <RootGrid container>
        <Grid container item xs={3}>
          <About data={data.personal} />
        </Grid>
        <Grid container item xs={9} />
      </RootGrid>
    );
  }
}

export default Resume;
