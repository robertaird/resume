import { replaceSpan } from './replaceSpan';

/**
 * Prism is missing some code, probably due to the slicing being done.
 * This is my overkill solution for getting it to take another look.
 * @param code
 */
export const cleanup = (code: string | null) => {
  if (code === null) {
    return null;
  }
  const div = document.createElement('div');
  div.innerHTML = code;
  const plainTextNodes = div.getElementsByClassName('plain-text');
  if (plainTextNodes.length) {
    for (let i = 0; i < plainTextNodes.length; i++) {
      replaceSpan(plainTextNodes[i] as HTMLElement);
    }
  }
  return div.innerHTML;
};
