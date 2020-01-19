/**
 * @module ActiveProvider
 * Provides the current active element to consumers, as well as the appropriate setters
 */
import React, { createContext, useState } from 'react';
import { validateState } from 'utils/validateState';

interface ActiveProviderProps {
  disabled?: boolean;
}

export interface ActiveState {
  activeEl: string;
  setActive: React.Dispatch<React.SetStateAction<string>> | (() => void);
  addId: (id: string) => number;
  idLength: () => number;
  enabled: boolean;
}

const ids = [];
const addId = (id: string) => ids.push(id);
const idLength = () => ids.length;
const defaultActiveState: ActiveState = {
  activeEl: '',
  setActive() {},
  addId,
  idLength,
  enabled: false,
};

export const ActiveContext = createContext(defaultActiveState);

export function validateActiveState(possibleState: object) {
  return validateState<ActiveState>(defaultActiveState, possibleState);
}

// TODO: Click + Hold active
const ActiveProvider: React.FC<ActiveProviderProps> = ({
  children,
  disabled,
}) => {
  const [activeEl, setActive] = useState('');

  return (
    <ActiveContext.Provider
      value={{ activeEl, setActive, addId, idLength, enabled: !disabled }}
    >
      {children}
    </ActiveContext.Provider>
  );
};

export default ActiveProvider;
