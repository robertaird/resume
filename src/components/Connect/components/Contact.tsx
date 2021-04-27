import { IconRow } from './IconRow';
import { ContactItem } from './ContactItem';
import { SubSection } from './styles';

type personal = import('types').personal;

type ContactProps = Pick<personal, 'contact'>;

export const Contact = ({ contact }: ContactProps) => (
  <SubSection container item xs md="auto">
    {contact.map((item) => (
      <IconRow key={`link-${item[0]}`} iconName={item[0]}>
        <ContactItem item={item}></ContactItem>
      </IconRow>
    ))}
  </SubSection>
);
