/**
 * @module ActiveProvider
 * Provides the current active element to consumers, as well as the appropriate setters
 */
import React, { createContext, useState } from "react";

type ActiveProviderProps = {
  disabled?: boolean;
};
type ActiveState = {
  activeEl: string;
  setActive: React.Dispatch<React.SetStateAction<string>> | (() => void);
  addId: (id: string) => number;
  idLength: () => number;
  enabled: boolean;
};

const ids = [];
const addId = (id: string) => ids.push(id);
const idLength = () => ids.length;

export const ActiveContext = createContext({
  activeEl: "",
  setActive: () => {},
  addId,
  idLength,
  enabled: false
} as ActiveState);

const ActiveProvider: React.FC<ActiveProviderProps> = ({
  children,
  disabled
}) => {
  const [activeEl, setActive] = useState("");
  return (
    <ActiveContext.Provider
      value={{ activeEl, setActive, addId, idLength, enabled: !disabled }}
    >
      {children}
    </ActiveContext.Provider>
  );
};

export default ActiveProvider;
