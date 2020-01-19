/**
 * @module SourceProvider
 * Provides the current active element to consumers, as well as the appropriate setters
 */
import React from 'react';
import styled from 'styled-components';
import { Drawer as MuiDrawer } from '@material-ui/core';
import CodeView from 'components/CodeView';

interface SourceDrawerProps {
  drawerWidth: number;
  open: boolean;
  code: {
    fileName: string;
    html: string;
  };
}

interface DrawerProps {
  'data-width': number;
}

const Drawer = styled(MuiDrawer)<DrawerProps>`
  text-align: left;
  min-width: ${props => props['data-width']}px;
  flex-shrink: 0;
  pointer-events: none;
  & .MuiPaper-root {
    overflow: visible;
    width: ${props => props['data-width']}px;
    pointer-events: auto;
    pointer-events: default;
  }
`;

const SourceDrawer: React.FC<SourceDrawerProps> = ({
  open,
  code = {
    html: '',
    fileName: '',
  },
  drawerWidth,
}) => {
  return (
    <Drawer
      data-width={drawerWidth}
      open={open}
      anchor="right"
      variant="persistent"
    >
      <CodeView html={code.html} fileName={code.fileName} />
    </Drawer>
  );
};

export default SourceDrawer;
