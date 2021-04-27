import Prism from '../../../prism';

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
