import React from 'react';
import styled from 'styled-components';
import { Grid, Link } from '@material-ui/core';
import { Section, SpanNoWrap } from 'components/Common';
import { Github, LinkedIn } from 'components/icons';
import Code from 'containers/Code';
// @ts-ignore
import txt from '!raw-loader!./index.tsx';

type SectionProps = Pick<
  React.ComponentPropsWithoutRef<typeof Section>,
  'padding' | 'headerRadius'
>;

interface Icons {
  [k: string]: React.ReactNode;
}

type Props = {
  personal: personal;
} & SectionProps &
  React.HTMLProps<HTMLDivElement>;

const icons: Icons = {
  github: <Github color="primary" />,
  linkedin: <LinkedIn color="primary" />,
};

const Links = styled(Grid)`
  max-width: 395px;
  margin-left: auto;
  padding: 0 0.5rem;
`;

/**
 * TODO: RowItem component
 * TODO: Link component
 */
const RowItem: React.FC = styled(({ children, className }) => (
  <Grid xs="auto" className={className} item container direction="row">
    {children}
  </Grid>
))`
  min-height: 12px;
`;

const BasicRow: React.FC = ({ children }) => (
  <RowItem>
    <SpanNoWrap>{children}</SpanNoWrap>
  </RowItem>
);
export const Connect = React.forwardRef<HTMLDivElement, Props>(function Connect(
  { personal: { location, phone, email, links }, headerRadius, padding },
  ref,
) {
  return (
    <Code code={txt}>
      <Section
        title="Connect"
        outerRef={ref}
        headerRadius={headerRadius}
        padding={padding}
      >
        <BasicRow>{location}</BasicRow>
        <RowItem />
        <BasicRow>{phone}</BasicRow>
        <BasicRow>{email}</BasicRow>
        <RowItem />
        <Links container item>
          {links.map(link => (
            <RowItem key={`link-${link[0]}`}>
              <Grid container item xs={2} alignContent="center">
                {icons[link[0]] ? icons[link[0]] : ''}
              </Grid>
              <Grid container item xs alignContent="flex-end">
                <Link href={link[2]} noWrap variant="body2">
                  {link[1]}
                </Link>
              </Grid>
            </RowItem>
          ))}
        </Links>
      </Section>
    </Code>
  );
});

export default Connect;
