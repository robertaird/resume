import { ReactElement } from 'react';

export function isSingleChild(
  children: ReactElement | ReactElement[],
): children is ReactElement {
  return children.hasOwnProperty('props');
}
