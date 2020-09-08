import React from 'react';
import Prism from '../../prism';

export const removeFirstIndent = (code: string) =>
  code.replace(/^(?:\s\s)/gm, '');

export const relativeFileName = (fileName: string) => {
  return `src/${fileName.split('src/')[1]}`;
};

export function isSingleChild(
  children: React.ReactElement | React.ReactElement[],
): children is React.ReactElement {
  return children.hasOwnProperty('props');
}
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

/**
 * I didn't see any instances of Prism highlighting two different languages
 * in the same block, so, doing it myself. I realize this is not going to be
 * super reliable for all use cases.
 * @param code
 * @param next
 */
export const parseStyled = (
  code: string | null,
  next?: number,
): string | null => {
  if (code === null) {
    return null;
  }
  const templateTag = '<span class="token string">`</span>';
  // don't count the import statement
  const initial = code.indexOf('styled-components') + 17;
  const startIndex = (typeof next === 'number' ? next : initial) + 1;
  // should probably check for index of 'styled.' or 'styled(' instead
  const styledDeclaration = code.indexOf('styled', startIndex);
  const templateStart = code.indexOf('`', styledDeclaration) + 1;
  // What happens here if I'm nesting templates? Probably nothing good.
  const templateEnd = code.indexOf('`', templateStart + 1);

  if (styledDeclaration > -1 && templateStart > -1 && templateEnd > -1) {
    return (
      Prism.highlight(
        code.substring(0, templateStart - 1),
        Prism.languages.tsx,
        'tsx',
      ) +
      templateTag +
      // TODO: Parse out '${' to '}' for styling further ts blocks
      `<span class="css-block">${Prism.highlight(
        code.substring(templateStart, templateEnd),
        Prism.languages.css,
        'css',
      )}</span>` +
      templateTag +
      parseStyled(code.substring(templateEnd + 1))
    );
  } else {
    return Prism.highlight(code, Prism.languages.tsx, 'tsx');
  }
};

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

/** Add props to the hover element */
export const setChildrenProps = (
  id: string,
  setActive: React.Dispatch<string>,
) => ({
  onMouseOver: (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(id);
  },
});

/** Try to suss out approximately how high up the current child is in the tree */
export const getTreeDepth = (
  children: React.ReactElement | React.ReactElement[],
  count = 0,
): number => {
  let newCount = count;
  if (children) {
    newCount += React.Children.count(children);
    if (isSingleChild(children)) {
      newCount = getTreeDepth(children.props.children, newCount);
    } else if (Array.isArray(children)) {
      newCount = children.reduce((count, child) => {
        return count + getTreeDepth(child, count);
      }, 0);
    }
  }
  return newCount;
};

export function calculateZIndex(
  height: number,
  offsetTop: number,
  offsetLeft: number,
  adjustment: number,
) {
  const offset = offsetTop + offsetLeft / 100 + 100;
  return Math.floor(
    offset +
      adjustment /
        Math.abs(
          10 - Math.max(0, Math.ceil(height / 5 / (Math.log(adjustment) / 10))),
        ),
  );
}
