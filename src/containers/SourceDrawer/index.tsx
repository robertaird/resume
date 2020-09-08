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
  code: import('containers/SourceProvider').code;
}

interface DrawerProps {
  'data-width': number;
  'data-open': string;
}

const Drawer = styled(MuiDrawer)<DrawerProps>`
  text-align: left;
  height: auto;
  min-width: ${(props) => props['data-width']}px;
  flex: ${(props) => (props['data-open'] === 'true' ? '3' : '0')};
  flex-shrink: 0;
  overflow: visible;
  pointer-events: none;
  & .MuiPaper-root {
    height: 100vh;
    position: ${(props) =>
      props['data-open'] === 'true' ? 'sticky' : 'fixed'};
    overflow: visible;
    top: 0;
    bottom: 0;
    z-index: 10000;
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
      data-open={open ? 'true' : ''}
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
