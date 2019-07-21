/**
 * @module SourceProvider
 * Provides the current active element to consumers, as well as the appropriate setters
 */
import React, { createContext, useState } from "react";
import styled from "styled-components";
import { Drawer as MuiDrawer } from "@material-ui/core";
import CodeView from "components/CodeView";

const defaultCode = { fileName: "", html: "" };

type SourceProviderProps = {
  drawerWidth: number;
  disabled?: boolean;
  children: (open: boolean) => React.ReactNode;
};
type SourceState = {
  code: typeof defaultCode;
  setCode:
    | React.Dispatch<React.SetStateAction<typeof defaultCode>>
    | (() => void);
  open: boolean;
  handleOpen: () => void;
};

type DrawerProps = {
  "data-width": number;
};
const Drawer = styled(MuiDrawer)<DrawerProps>`
  text-align: left;
  min-width: ${props => props["data-width"]}px;
  flex-shrink: 0;

  & .MuiPaper-root {
    overflow: visible;
    width: ${props => props["data-width"]}px;
  }
`;

export const SourceContext = createContext({
  code: defaultCode,
  setCode: () => {},
  handleOpen: () => {}
} as SourceState);

const SourceProvider: React.FC<SourceProviderProps> = ({
  drawerWidth,
  children
}) => {
  const [code, setCode] = useState(defaultCode);
  const [open, toggleOpen] = useState(false);
  const handleOpen = () => {
    toggleOpen(!open);
  };
  return (
    <SourceContext.Provider value={{ open, code, setCode, handleOpen }}>
      {children(open)}
      <Drawer
        data-width={drawerWidth}
        open={open}
        anchor="right"
        variant="persistent"
      >
        <CodeView html={code.html} fileName={code.fileName} />
      </Drawer>
    </SourceContext.Provider>
  );
};

export default SourceProvider;
