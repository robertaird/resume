import React from 'react';
import { isSingleChild } from './isSingleChild';

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
