/**
 * @module SourceProvider
 * Provides the current active source code to consumers, as well as the appropriate setters
 */
import React, { createContext, useState } from 'react';
import { validateState } from 'utils/validateState';

export type code = {
  fileName: string;
  html: string;
  // parsed: string;
};

interface SourceProviderProps {
  children: (open: boolean, code: code) => React.ReactNode;
}

export type SourceState = {
  code: code;
  open: boolean;
  setCode:
    | React.Dispatch<React.SetStateAction<typeof defaultCode>>
    | (() => void);
  handleOpen: () => void;
};

const defaultCode = { fileName: '', html: '' };
const defaultOpen = false;
const defaultSourceState: SourceState = {
  code: defaultCode,
  open: defaultOpen,
  handleOpen() {},
  setCode() {},
};

export const SourceContext = createContext(defaultSourceState);

export function validateSourceState(possibleState: any) {
  return validateState<SourceState>(defaultSourceState, possibleState);
}

const SourceProvider: React.FC<SourceProviderProps> = ({ children }) => {
  const [code, setCode] = useState(defaultCode);
  const [open, toggleOpen] = useState(defaultOpen);
  const handleOpen = () => {
    toggleOpen(!open);
  };
  return (
    <SourceContext.Provider value={{ open, code, setCode, handleOpen }}>
      {children(open, code)}
    </SourceContext.Provider>
  );
};

export default SourceProvider;
