import React from 'react';
import styled from 'styled-components';
import { Grid as MuiGrid, Typography } from '@material-ui/core';
import { DARK } from 'style/theme';
import Code from 'containers/Code';

interface Props extends React.HTMLProps<HTMLDivElement> {
  title: string;
  padding?: string;
  outerRef?: React.Ref<HTMLDivElement>;
  headerRadius?: headerRadiusOptions;
}

interface GridProps {
  padding?: string;
}

type headerRadiusOptions = 'none' | 'top';

interface HeaderProps {
  'data-headerradius'?: headerRadiusOptions;
}

function setHeaderRadius(option?: headerRadiusOptions) {
  switch (option) {
    case 'none':
      return '0';
    case 'top':
      return '2px 2px 0 0';
    default:
      return '2px';
  }
}

const Grid = styled(MuiGrid)<GridProps>`
  padding: ${props => props.padding || '2px 4px 8px'};
  height: max-content;
`;

const HeaderDiv = styled(MuiGrid)<HeaderProps>`
  border-radius: ${props => setHeaderRadius(props['data-headerradius'])};
  background: ${props =>
    props.theme.palette.type === DARK
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
  height: 32px;
  width: 100%;
  margin-bottom: 0.4rem;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
`;

const HeaderText = styled(Typography)`
  letter-spacing: 0.08333em;
  font-size: 1.05rem;
  text-transform: uppercase;
  @media print {
    color: ${props => props.theme.palette.text.primary} !important;
  }
`;

export const Section = React.forwardRef<HTMLDivElement, Props>(function Section(
  { children, title, outerRef, padding, headerRadius },
  ref,
) {
  return (
    <Code>
      <Grid container ref={outerRef} padding={padding}>
        <HeaderDiv
          container
          justify="center"
          alignContent="flex-end"
          data-headerradius={headerRadius}
        >
          <HeaderText align="center" variant="h6" noWrap>
            {title}
          </HeaderText>
        </HeaderDiv>
        <Grid ref={ref} item container alignItems="baseline" justify="center">
          {children}
        </Grid>
      </Grid>
    </Code>
  );
});
