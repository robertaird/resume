import type { default as ReactTypes } from 'https://deno.land/x/types/react/v16.13.1/react.d.ts';
import type * as ReactDOMTypes from 'https://deno.land/x/types/react-dom/v16.13.1/react-dom.d.ts';
/** Types from node_modules for lack of an obvious better solution */
import type { default as PrismTypes } from '../../node_modules/@types/prismjs/index.d.ts';
import type { default as styledTypes } from '../../node_modules/@types/styled-components/index.d.ts';
import type * as MuiCoreTypes from '../../node_modules/@material-ui/core/index.d.ts';
import ReactI from 'https://dev.jspm.io/react@16.13.1';
import ReactDOMImport from 'https://dev.jspm.io/react-dom@16.13.1';
import PrismImport from 'https://dev.jspm.io/prismjs@1.21.0';
import styledImport from 'https://dev.jspm.io/styled-components@5.1.1';
import * as MuiCoreImport from 'https://dev.jspm.io/@material-ui/core@4.11.0';
import 'https://dev.jspm.io/prismjs@1.21.0/components/prism-jsx.min';
import 'https://dev.jspm.io/prismjs@1.21.0/components/prism-typescript.min';
import 'https://dev.jspm.io/prismjs@1.21.0/components/prism-css';
import 'https://dev.jspm.io/prismjs@1.21.0/components/prism-css-extras';
import 'https://dev.jspm.io/prismjs@1.21.0/plugins/highlight-keywords/prism-highlight-keywords';
import 'https://dev.jspm.io/prismjs@1.21.0/plugins/custom-class/prism-custom-class';

export const styled = (styledImport as unknown) as typeof styledTypes;
export const MuiCore = (MuiCoreImport as unknown) as typeof MuiCoreTypes;
export const Prism = (PrismImport as unknown) as typeof PrismTypes;
export const React = (ReactI as unknown) as typeof ReactTypes;
export const ReactDOM = (ReactDOMImport as unknown) as typeof ReactDOMTypes;
