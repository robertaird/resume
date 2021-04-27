import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@material-ui/core';
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
import { DetailsCol, MainCol, MainContent, Paper, Root } from './styles';

interface ResumeProps {
  data: import('types').resume;
  code: import('containers/SourceProvider').code;
  open: boolean;
}

// TODO: Where should this go
const drawerWidth = 625;

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
