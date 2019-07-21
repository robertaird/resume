import React from "react";
import styled from "styled-components";
import DataLabel from "components/DataLabel";
import DataItem from "components/DataItem";
import Code from "containers/Code";
// @ts-ignore
import txt from "!raw-loader!./index.tsx";

type Props = {
  label: React.ReactNode;
  data: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

const Wrap = styled.div`
  width: 100%;
  display: inherit;
`;

export const DataField = React.forwardRef<HTMLDivElement, Props>(
  ({ label, data }, ref) => {
    return (
      <Code code={txt}>
        <Wrap ref={ref}>
          <DataLabel>{label}</DataLabel>
          <DataItem>{data}</DataItem>
        </Wrap>
      </Code>
    );
  }
);

export default DataField;
