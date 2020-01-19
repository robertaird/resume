import React from 'react';
import styled from 'styled-components';
import { CardHeader as MuiCardHeader } from '@material-ui/core';
import Code from 'containers/Code';

interface Props {
  personal: personal;
  action?: React.ReactNode;
}

const CardHeader = styled(MuiCardHeader)`
  & .MuiCardHeader-avatar {
    margin-right: 0;
    margin-left: -8px;
  }

  &.MuiCardHeader-root {
    padding: 6px 8px;
  }
`;

export const Header = React.forwardRef<HTMLDivElement, Props>(function Header(
  { personal, action },
  ref,
) {
  return (
    <Code>
      <CardHeader
        ref={ref}
        title={`${personal.firstName} ${personal.lastName}`}
        titleTypographyProps={{
          color: 'primary',
          variant: 'h4',
          align: 'left',
        }}
        subheaderTypographyProps={{ variant: 'subtitle1', align: 'left' }}
        subheader={personal.title}
        action={action}
      />
    </Code>
  );
});

export default Header;
