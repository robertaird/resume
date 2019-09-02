import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Paper as MuiPaper } from '@material-ui/core';
import ActiveProvider from 'containers/ActiveProvider';
import SourceDrawer from 'containers/SourceDrawer';
import { HeaderButtons } from 'containers/HeaderButtons';
import Header from 'components/Header';
import Connect from 'components/Connect';
import About from 'components/About';
import Skills from 'components/Skills';
import Education from 'components/Education';
import Experience from 'components/Experience';
import RelatedExperience from 'components/RelatedExperience';

interface ResumeProps {
  data: resume;
}

interface ResumeState {
  disableHover: boolean;
}

interface RootProps {
  'data-shift': boolean;
  'data-drawer-width': number;
}

// TODO: Where should this go
const drawerWidth = 625;

const Root = styled(Container)`
  padding: 20px;
  display: flex;
`;

const MainContent = styled.div<RootProps>`
  flex-grow: 1;
  margin-right: ${props =>
    props['data-shift'] ? 0 : -props['data-drawer-width']}px;
  transition: ${props =>
    props['data-shift']
      ? props.theme.transitions.create('margin', {
          easing: props.theme.transitions.easing.easeOut,
          duration: props.theme.transitions.duration.enteringScreen,
        })
      : props.theme.transitions.create('margin', {
          easing: props.theme.transitions.easing.sharp,
          duration: props.theme.transitions.duration.leavingScreen,
        })};
`;

const Col = styled(Grid)`
  flex-grow: 1;
  max-width: revert;
`;

const LeftCol = styled(Col)`
  min-width: 135px;
`;

const RightCol = styled(Col)`
  order: -1;
  min-width: 430px;
`;

const Paper = styled(MuiPaper)`
  margin: 2px;
`;

class Resume extends React.PureComponent<ResumeProps, ResumeState> {
  state = {
    disableHover: false,
  };

  toggleHover = () => {
    this.setState(({ disableHover }) => ({
      disableHover: !disableHover,
    }));
  };

  render() {
    const { data } = this.props;
    const { disableHover } = this.state;
    return (
      <Root>
        <SourceDrawer drawerWidth={drawerWidth}>
          {open => (
            <ActiveProvider disabled={disableHover}>
              <MainContent data-shift={open} data-drawer-width={drawerWidth}>
                <Header personal={data.personal} action={<HeaderButtons />} />
                <Grid container direction="row-reverse">
                  <LeftCol container item xs={3}>
                    <Paper elevation={0}>
                      <Connect
                        personal={data.personal}
                        headerRadius="top"
                        padding="0 0 8px;"
                      />
                      <About
                        personal={data.personal}
                        headerRadius="none"
                        padding="2px 0 8px;"
                      />
                      <Skills
                        professionalSkills={data.professionalSkills}
                        headerRadius="none"
                        padding="2px 0 8px;"
                      />
                      <Education
                        education={data.education}
                        headerRadius="none"
                        padding="2px 0 8px;"
                      />
                    </Paper>
                  </LeftCol>
                  <RightCol container item xs={9}>
                    <Experience experience={data.experience} />
                    <RelatedExperience
                      otherExperience={data.experience.other}
                    />
                  </RightCol>
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
