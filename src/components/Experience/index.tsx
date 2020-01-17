import React from 'react';
import { Section } from 'components/Common';
import Work from './Work';
import Code from 'containers/Code';
// @ts-ignore
import txt from '!raw-loader!./index.tsx';

type Props = {
  experience: resume['experience'];
} & React.HTMLProps<HTMLDivElement>;

export const Experience = React.forwardRef<HTMLDivElement, Props>(
  function Experience({ experience }, ref) {
    return (
      <Code code={txt}>
        <Section title="Professional Experience" outerRef={ref}>
          {experience.work.map(workItem => (
            <Work key={`${workItem.company.name}-comp`} workItem={workItem} />
          ))}
        </Section>
      </Code>
    );
  },
);

export default Experience;
