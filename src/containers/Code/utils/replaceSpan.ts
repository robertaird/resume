import Prism from '../../../prism';

/**
 * Attempts to re-parse elements with the .plain-text class. Doesn't catch
 * a lot, but it's better.
 * @param el
 */
export const replaceSpan = (el: HTMLElement) => {
  const stripped = el.innerText.replace(/ /g, '');
  // arbitrary
  if (stripped.length > 10) {
    const round2 = Prism.highlight(el.innerText, Prism.languages.js, 'js');
    el.innerHTML = round2;
  }
  return el;
};
