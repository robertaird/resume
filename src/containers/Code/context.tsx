import React, { createContext, useState } from 'react';
import { validateActiveState } from 'containers/ActiveProvider';
import { validateSourceState } from 'containers/SourceProvider';

type ActiveState = React.Context<
  import('containers/ActiveProvider').ActiveState
>;
type SourceState = React.Context<
  import('containers/SourceProvider').SourceState
>;
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

interface CodeProviderRefs {
  ActiveContext: ActiveState;
  SourceContext: SourceState;
}

interface CodeProviderState extends CodeProviderRefs {
  sourceStore: codeStore;
  addSource: addSource;
}

interface InitialCodeProviderState
  extends Omit<CodeProviderState, 'ActiveContext' | 'SourceContext'> {
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

let _ActiveContext: ActiveState;
let _SourceContext: SourceState;

const ContextSetter = (() => {
  function setActiveContext(ActiveContext: ActiveState) {
    _ActiveContext = ActiveContext;
  }
  function setSourceContext(SourceContext: SourceState) {
    _SourceContext = SourceContext;
  }

  return {
    async getActiveContext() {
      if (!_ActiveContext) {
        await import('containers/ActiveProvider').then(({ ActiveContext }) => {
          setActiveContext(ActiveContext);
        });
      }
      return _ActiveContext;
    },
    async getSourceContext() {
      if (!_SourceContext) {
        await import('containers/SourceProvider').then(({ SourceContext }) => {
          setSourceContext(SourceContext);
        });
      }
      return _SourceContext;
    },
    setContext(ActiveContext?: ActiveState, SourceContext?: SourceState) {
      if (
        typeof ActiveContext === 'object' &&
        validateActiveState(ActiveContext)
      ) {
        setActiveContext(ActiveContext);
      }
      if (
        typeof SourceContext === 'object' &&
        validateSourceState(SourceContext)
      ) {
        setSourceContext(SourceContext);
      }
    },
  };
})();

export const CodeContext = createContext<CodeProviderState>({
  sourceStore: defaultContext.sourceStore,
  addSource: defaultContext.addSource,
  ActiveContext: {} as ActiveState,
  SourceContext: {} as SourceState,
});

const checkContext = (current: null | CodeProviderRefs) =>
  current === null ||
  current.ActiveContext !== _ActiveContext ||
  current.SourceContext !== _SourceContext;

const CodeProvider: React.FC = ({ children }) => {
  const [sourceStore, setStore] = useState<codeStore>(defaultStore);
  const [contexts, setContexts] = useState<null | CodeProviderRefs>(null);
  const addSource = defaultContext.initAddSource.bind(defaultContext, setStore);
  // TODO: probably rename?
  function getContext() {
    setContexts({
      ActiveContext: _ActiveContext,
      SourceContext: _SourceContext,
    });
  }
  if (checkContext(contexts)) {
    Promise.all([
      ContextSetter.getActiveContext(),
      ContextSetter.getSourceContext(),
    ]).then(() => getContext());
  }
  if (contexts === null) {
    return null;
  }
  return (
    <CodeContext.Provider
      value={{
        sourceStore,
        addSource,
        ActiveContext: contexts.ActiveContext,
        SourceContext: contexts.SourceContext,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export default CodeProvider;
