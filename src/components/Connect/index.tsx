import React from 'react';
import styled from 'styled-components';
import { Grid, Link, Typography } from '@material-ui/core';
import { Section } from 'components/Common';
import { Github, LinkedIn, Email, LocationCity, Phone } from 'components/icons';
import Code from 'containers/Code';

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

type ContactProps = Pick<personal, 'contact'>;

const icons: Icons = {
  phone: <Phone color="primary" />,
  location: <LocationCity color="primary" />,
  email: <Email color="primary" />,
  github: <Github color="primary" />,
  linkedin: <LinkedIn color="primary" />,
};

const IconGrid = styled(Grid)`
  flex-grow: 0;
  max-width: 30px;
  flex-basis: 30px;
`;

const TextGrid = styled(Grid)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    && {
      max-width: fit-content;
    }
  }
`;

const SubSection = styled(Grid)`
  width: 100%;
  padding: 0 0.5rem;
  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-left: auto;
    max-width: 395px;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    && {
      max-width: 80vw;
      justify-content: space-evenly;
    }
  }
`;

const BareRowItem: React.FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <Grid className={className} xs item container direction="row">
    {children}
  </Grid>
);

const RowItem = styled(BareRowItem)`
  min-height: 12px;
  min-width: 12.5rem;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    && {
      max-width: fit-content;
      justify-content: center;
    }
  }
`;

const IconRow = ({
  iconName,
  children,
}: {
  iconName: string;
  children: React.ReactNode;
}) => (
  <RowItem>
    <IconGrid container item alignContent="center">
      {icons[iconName] ? icons[iconName] : ''}
    </IconGrid>
    <TextGrid container item xs alignContent="flex-end">
      {children}
    </TextGrid>
  </RowItem>
);

const ContactItem = ({ item }: { item: string[] }) => {
  if (item[2]) {
    return (
      <Link href={item[2]} noWrap variant="body2">
        {item[1]}
      </Link>
    );
  }
  return (
    <Typography noWrap variant="body2">
      {item[1]}
    </Typography>
  );
};

export const Contact = ({ contact }: ContactProps) => (
  <SubSection container item xs md="auto">
    {contact.map((item) => (
      <IconRow key={`link-${item[0]}`} iconName={item[0]}>
        <ContactItem item={item}></ContactItem>
      </IconRow>
    ))}
  </SubSection>
);

export const Connect = React.forwardRef<HTMLDivElement, Props>(function Connect(
  { personal: { contact }, headerRadius, padding },
  ref,
) {
  return (
    <Code>
      <Section outerRef={ref} headerRadius={headerRadius} padding={padding}>
        <Contact contact={contact} />
      </Section>
    </Code>
  );
});

export default Connect;
