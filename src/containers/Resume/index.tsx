import React from "react";
import styled from "styled-components";
import { Container, Grid } from "@material-ui/core";
import ActiveProvider from "containers/ActiveProvider";
import SourceDrawer from "containers/SourceDrawer";
import Header from "components/Header";
import Connect from "components/Connect";
import About from "components/About";
import Experience from "components/Experience";

type ResumeProps = {
  data: resume;
  drawerWidth: number;
};

interface ResumeState {
  disableHover: boolean;
}

type RootProps = {
  "data-shift": boolean;
  "data-drawer-width": number;
};

const Root = styled(Container)`
  padding: 20px;
  position: relative;
  display: flex;
`;

const MainContent = styled.div<RootProps>`
  flex-grow: 1;
  /* padding: ${props => (props["data-shift"] ? "20px 0" : "20")}px; */
  margin-right: ${props =>
    props["data-shift"] ? 0 : -props["data-drawer-width"]}px;
  transition: ${props =>
    props["data-shift"]
      ? props.theme.transitions.create("margin", {
          easing: props.theme.transitions.easing.easeOut,
          duration: props.theme.transitions.duration.enteringScreen
        })
      : props.theme.transitions.create("margin", {
          easing: props.theme.transitions.easing.sharp,
          duration: props.theme.transitions.duration.leavingScreen
        })};
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
    const { data, drawerWidth } = this.props;
    const { disableHover } = this.state;
    return (
      <Root>
        <SourceDrawer drawerWidth={drawerWidth}>
          {open => (
            <ActiveProvider disabled={disableHover}>
              <MainContent data-shift={open} data-drawer-width={drawerWidth}>
                <Header personal={data.personal} />
                <Grid container>
                  <Grid container item xs={3}>
                    <Connect personal={data.personal} />
                    <About personal={data.personal} />
                  </Grid>
                  <Grid container item xs={9}>
                    <Experience experience={data.experience} />
                  </Grid>
                </Grid>
              </MainContent>
            </ActiveProvider>
          )}
        </SourceDrawer>
      </Root>
    );
  }
}

export default Resume;
