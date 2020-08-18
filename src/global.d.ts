declare module 'console' {
  export = typeof import('console');
}

// Placeholder to appease typescript, __NAME is injected by Webpack
declare const __NAME = '';
type __NAME = string;
