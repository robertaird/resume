import React, { createContext, useState } from 'react';

type setSource = React.Dispatch<React.SetStateAction<codeStore>>;

type initAddSource = (
  setSource: setSource,
  fileName: string,
  source: string,
) => void;

type codeStore = {
  [k: string]: string;
};

type bindAddSource<F extends initAddSource> = F extends (
  setSource: setSource,
  ...args: infer P
) => void
  ? (...args: P) => void
  : never;

type addSource = bindAddSource<
  (setSource: setSource, fileName: string, source: string) => void
>;

type CodeProviderState = {
  sourceStore: codeStore;
  addSource: addSource;
};

interface InitialCodeProviderState extends CodeProviderState {
  initAddSource: initAddSource;
}

const defaultStore = {};

const defaultContext: InitialCodeProviderState = {
  sourceStore: defaultStore,
  addSource() {},
  initAddSource(setSource, fileName, source) {
    if (!this.sourceStore[fileName]) {
      this.sourceStore[fileName] = source;
      setSource(this.sourceStore);
    }
  },
};

export const CodeContext = createContext<CodeProviderState>({
  sourceStore: defaultContext.sourceStore,
  addSource: defaultContext.addSource,
});

const CodeProvider: React.FC = ({ children }) => {
  const [sourceStore, setStore] = useState<codeStore>(defaultStore);
  const addSource = defaultContext.initAddSource.bind(defaultContext, setStore);
  return (
    <CodeContext.Provider
      value={{
        sourceStore,
        addSource,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export default CodeProvider;
