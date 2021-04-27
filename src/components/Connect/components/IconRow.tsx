import type { ReactNode } from 'react';
import { Github, LinkedIn, Email, LocationCity, Phone } from 'components/svg';
import { IconGrid, TextGrid, RowItem } from './styles';

interface Icons {
  [k: string]: ReactNode;
}

const icons: Icons = {
  phone: <Phone color="primary" />,
  location: <LocationCity color="primary" />,
  email: <Email color="primary" />,
  github: <Github color="primary" />,
  linkedin: <LinkedIn color="primary" />,
};

export const IconRow = ({
  iconName,
  children,
}: {
  iconName: string;
  children: ReactNode;
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
