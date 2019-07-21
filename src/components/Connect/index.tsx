import React from "react";
import styled from "styled-components";
import { Grid /* Typography */ } from "@material-ui/core";
import Section from "components/Section";
// import Label from "components/DataLabel";
import Data from "components/DataItem";
import Field from "components/DataField";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  personal: personal;
} & React.HTMLProps<HTMLDivElement>;

const RowItem: React.FC = styled(({ children, className }) => (
  <Grid className={className} item container direction="row">
    {children}
  </Grid>
))`
  min-height: 12px;
`;

const BasicRow: React.FC = ({ children }) => (
  <RowItem>
    <Data fullWidth>{children}</Data>
  </RowItem>
);
export const About = React.forwardRef<HTMLDivElement, Props>(
  ({ personal: { location, phone, email, links } }, ref) => {
    return (
      <Code code={txt}>
        <Section title="Connect" outerRef={ref}>
          <BasicRow>{location}</BasicRow>
          <RowItem />
          <BasicRow>{phone}</BasicRow>
          <BasicRow>{email}</BasicRow>
          <RowItem />
          <Grid container item>
            {links.map(link => (
              <RowItem key={`link-${link[0]}`}>
                <Field label={link[0]} data={link[1]} />
              </RowItem>
            ))}
          </Grid>
        </Section>
      </Code>
    );
  }
);

export default About;
