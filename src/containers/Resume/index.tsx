import React from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import ActiveProvider from "../ActiveProvider";
import About from "../../components/About";
import Experience from "../../components/Experience";

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
      <ActiveProvider disabled>
        <RootGrid container>
          <Grid container item xs={3}>
            <About data={data.personal} />
          </Grid>
          <Grid container item xs={9}>
            <Experience data={data.experience} />
          </Grid>
        </RootGrid>
      </ActiveProvider>
    );
  }
}

export default Resume;
