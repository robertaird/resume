import React from "react";
import styled from "styled-components";
import { Container, Grid } from "@material-ui/core";
import ActiveProvider from "containers/ActiveProvider";
import About from "components/About";
import Experience from "components/Experience";

type ResumeProps = {
  data: resume;
};

interface ResumeState {
  disableHover: boolean;
}

const RootContainer = styled(Container)`
  display: flex;
  padding: 20px;
`;

class Resume extends React.PureComponent<ResumeProps, ResumeState> {
  state = {
    disableHover: false
  };

  toggleHover = () => {
    this.setState(({ disableHover }) => ({
      disableHover: !disableHover
    }));
  };

  render() {
    const { data } = this.props;
    const { disableHover } = this.state;
    return (
      <ActiveProvider disabled={disableHover}>
        <RootContainer>
          <Grid container item xs={3}>
            <About data={data.personal} />
          </Grid>
          <Grid container item xs={9}>
            <Experience data={data.experience} />
          </Grid>
        </RootContainer>
      </ActiveProvider>
    );
  }
}

export default Resume;
