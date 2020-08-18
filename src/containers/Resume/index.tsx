import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  Container,
  Grid,
  Paper as MuiPaper,
  useTheme,
} from '@material-ui/core';
import ActiveProvider from 'containers/ActiveProvider';
import SourceDrawer from 'containers/SourceDrawer';
import Code from 'containers/Code';
import { HeaderButtons } from 'containers/HeaderButtons';
import Header from 'components/Header';
import { Connect } from 'components/Connect';
import About from 'components/About';
import Skills from 'components/Skills';
import Education from 'components/Education';
import Experience from 'components/Experience';
import RelatedExperience from 'components/RelatedExperience';

interface ResumeProps {
  data: import('types').resume;
  code: import('containers/SourceProvider').code;
  open: boolean;
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

const Root = styled(Container)<{ open: boolean }>`
  max-width: 70rem;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  padding: 0px;
  ${(props) =>
    props.open
      ? css`
          max-width: inherit;
          margin-left: 0px;
          margin-right: 0px;
        `
      : ''}
`;

const MainContent = styled.div<RootProps>`
  max-width: 68rem;
  padding: 20px;
  flex: 4;
  display: grid;
  grid-gap: 0 2.5rem;
  grid-template-columns: 3fr minmax(200px, 1fr);
  grid-template-rows: auto auto 1fr;
  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.values.md - 1}px) {
    grid-template-columns: 1fr;
  }
  /* will-change: margin-right; */
  margin-right: ${(props) =>
    props['data-shift'] ? 0 : -props['data-drawer-width']}px;
`;

const Col = styled(Grid)`
  flex-grow: 1;
  max-width: revert;
`;

const DetailsCol = styled(Col)`
  min-width: 135px;
`;

const MainCol = styled(Col)`
  order: 0;
  min-width: 430px;
`;

const Paper = styled(MuiPaper)`
  margin: 2px;
`;

function Resume({ data, open: shouldOpen, code }: ResumeProps) {
  const [open, setOpen] = useState(shouldOpen);
  const theme = useTheme();
  const requestRef = useRef<number | null>(null);
  const animate = useCallback(() => {
    if (shouldOpen !== open) {
      setOpen(shouldOpen);
    }
    requestRef.current = requestAnimationFrame(animate);
  }, [shouldOpen, open, setOpen]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (typeof requestRef.current === 'number')
        cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);
  return (
    <ActiveProvider disabled={!open}>
      <Code fileName={__NAME}>
        <Root id="main-resume" className={theme.palette.type} open={open}>
          <MainContent data-shift={open} data-drawer-width={drawerWidth}>
            <HeaderButtons />
            <Header personal={data.personal} />
            <Connect personal={data.personal} />
            <MainCol container item xs={12} md={9}>
              <Experience experience={data.experience} />
              <RelatedExperience
                otherExperience={data.experience.other}
                headerRadius="none"
              />
            </MainCol>
            <DetailsCol container item xs={12} md={3}>
              <Paper elevation={0}>
                <About
                  personal={data.personal}
                  headerRadius="top"
                  padding="0 0 0.75rem;"
                />
                <Skills
                  professionalSkills={data.professionalSkills}
                  headerRadius="none"
                />
                <Education education={data.education} headerRadius="none" />
              </Paper>
            </DetailsCol>
          </MainContent>
          <SourceDrawer open={open} code={code} drawerWidth={drawerWidth} />
        </Root>
      </Code>
    </ActiveProvider>
  );
}

export default Resume;
