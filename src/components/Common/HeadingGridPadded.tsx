import React from 'react';
import { PaddedTypography } from './PaddedTypography';
import { HeadingGrid } from './HeadingGrid';

export const HeadingGridPadded = ({
  className,
  paragraph,
  title,
  date,
}: {
  className?: string;
  paragraph?: boolean;
  title: string;
  date: string;
}) => (
  <HeadingGrid
    className={className}
    title={
      <PaddedTypography paragraph={paragraph} variant="body2">
        {title}
      </PaddedTypography>
    }
    date={
      <PaddedTypography paragraph={paragraph} variant="body2">
        {date}
      </PaddedTypography>
    }
  />
);
