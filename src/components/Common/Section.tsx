import React from 'react';
import styled from 'styled-components';
import { Grid as MuiGrid, Typography } from '@material-ui/core';
import Code from 'containers/Code';

interface Props extends React.HTMLProps<HTMLDivElement> {
  padding?: string;
  outerRef?: React.Ref<HTMLDivElement>;
}

type HeaderProps = {
  title?: string;
  headerRadius?: headerRadiusOptions;
};

type GridProps = {
  padding?: string;
};

type headerRadiusOptions = 'none' | 'top';

type HeaderDivProps = {
  'data-headerradius'?: headerRadiusOptions;
};

const Grid = styled(MuiGrid)<GridProps>`
  padding: ${(props) => props.padding || '0.1rem 0 0.5rem'};
  height: max-content;
`;

const BodyGrid = styled(Grid)`
  margin-left: 0.35rem;
  margin-right: 0.15rem;
`;

const HeaderDiv = styled(MuiGrid)<HeaderDivProps>`
  border-bottom: 3px solid;
  border-color: ${(props) => props.theme.palette.primary.main};
  height: 32px;
  width: 100%;
  margin-bottom: 0.4rem;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
`;

const HeaderText = styled(Typography)`
  margin-left: 0.35rem;
  letter-spacing: 0.08333em;
  font-size: 1.05rem;
  text-transform: uppercase;
`;

const Header = ({ title, headerRadius }: HeaderProps) => {
  if (!title) {
    return null;
  }
  return (
    <HeaderDiv
      container
      // justify="center"
      alignContent="flex-end"
      data-headerradius={headerRadius}
    >
      <HeaderText align="center" variant="h6" noWrap>
        {title}
      </HeaderText>
    </HeaderDiv>
  );
};
export const Section = React.forwardRef<HTMLDivElement, Props & HeaderProps>(
  function Section({ children, title, outerRef, padding, headerRadius }, ref) {
    return (
      <Code fileName={__NAME}>
        <Grid container ref={outerRef} padding={padding}>
          <Header title={title} headerRadius={headerRadius} />
          <BodyGrid
            ref={ref}
            item
            container
            alignItems="baseline"
            justify="center"
          >
            {children}
          </BodyGrid>
        </Grid>
      </Code>
    );
  },
);
