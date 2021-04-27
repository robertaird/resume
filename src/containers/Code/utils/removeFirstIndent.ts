export const removeFirstIndent = (code: string) =>
  code.replace(/^(?:\s\s)/gm, '');
