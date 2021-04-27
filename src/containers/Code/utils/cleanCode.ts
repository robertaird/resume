import { removeFirstIndent } from './removeFirstIndent';
/**
 * This was for an earlier iteration of the Code element, which involved using
 * Webpack's raw-loader in the file itself rather than as an inline import.
 * Removing all the extra stuff I added to the code to create the code
 * blocks.
 */
export const cleanCode = (code: string | null) => {
  if (code === null) {
    return null;
  }
  const initial = code.replace(/\r\n/gm, '\n'); //.replace(replaceText, '');
  const split = initial.split('Code');
  split[1] = removeFirstIndent(split[1]);
  return (
    split
      .map((section, i) => {
        const lines = section.split('\n');
        if (i !== 0) {
          lines.splice(0, 1);
        }
        if (i !== split.length - 1) {
          lines.splice(lines.length - 1, 1);
        }
        return lines.join('\n');
      })
      .join('\n') + '\n'
  );
};
