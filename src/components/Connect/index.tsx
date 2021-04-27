import React from 'react';
import { Section } from 'components/Common';
import Code from 'containers/Code';
import { Contact } from './components';

type personal = import('types').personal;

type SectionProps = Pick<
  React.ComponentPropsWithoutRef<typeof Section>,
  'padding' | 'headerRadius'
>;

type Props = {
  personal: personal;
} & SectionProps &
  React.HTMLProps<HTMLDivElement>;

export const Connect = React.forwardRef<HTMLDivElement, Props>(function Connect(
  { personal: { contact }, headerRadius, padding },
  ref,
) {
  return (
    <Code fileName={__NAME}>
      <Section outerRef={ref} headerRadius={headerRadius} padding={padding}>
        <Contact contact={contact} />
      </Section>
    </Code>
  );
});

export default Connect;
