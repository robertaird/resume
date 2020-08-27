import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { CardHeader as MuiCardHeader } from '@material-ui/core';
import { Name as BaseName, Subtitle as BaseSubtitle } from 'components/svg';
import Code from 'containers/Code';

interface Props {
  personal: import('types').personal;
  action?: React.ReactNode;
}

type InvisiTextProps = {
  top?: string;
};

const InvisiText = styled.span<InvisiTextProps>`
  ${({ top }) =>
    top
      ? css`
          top: ${top}px;
        `
      : ''}
  left: -2px;
  font-weight: 800;
  font-size: 1.2rem;
  position: absolute;
  color: transparent;
`;

const Name = styled(BaseName)`
  width: -webkit-fill-available;
  max-height: -webkit-fill-available;
  height: 72pt;
  padding-left: 7px;
`;

const SubtitleSVG = styled(BaseSubtitle)`
  stroke: ${({ theme }) => theme.palette.primary.main};
  stroke-width: 0.02rem;
  height: 1rem;
  width: unset;
`;

const Subtitle = ({ children }: { children: React.ReactNode }) => (
  <Fragment>
    <InvisiText>{children}</InvisiText>
    <SubtitleSVG />
  </Fragment>
);

const CardHeader = styled(MuiCardHeader)`
  & .MuiCardHeader-avatar {
    margin-right: 0;
    margin-left: -8px;
  }

  &.MuiCardHeader-root {
    min-height: 140px;
    position: relative;
    padding: 6px 0 16px 6px;
    align-items: flex-end;
  }

  & .MuiCardHeader-title,
  & .MuiCardHeader-subheader {
    line-height: 0.95em;
  }

  & .MuiCardHeader-subheader {
    font-size: 0.9rem;
    text-indent: 0.5em;
  }

  & .MuiCardHeader-action {
    align-self: center;
  }
`;

const subheaderProps = {
  variant: 'overline',
  color: 'primary',
  align: 'left',
} as const;
export const Header = React.forwardRef<HTMLDivElement, Props>(function Header(
  { personal, action },
  ref,
) {
  return (
    <Code fileName={__NAME}>
      <CardHeader
        ref={ref}
        avatar={
          <InvisiText top="0">{`${personal.firstName} ${personal.lastName}`}</InvisiText>
        }
        title={<Name color="primary" />}
        subheaderTypographyProps={subheaderProps}
        subheader={<Subtitle>{personal.title}</Subtitle>}
        action={action}
      />
    </Code>
  );
});

export default Header;
