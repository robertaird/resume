import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import Code from 'containers/Code';

interface Props {
  /** Array consisting of either strings or arrays of strings */
  items: (string | string[])[];
  /** id for list items */
  id?: string;
}

const ListTypography: typeof Typography = styled(Typography)`
  width: 100%;
`;

export const ListItem: React.FC = ({ children }) => (
  <ListTypography component="li" variant="body2" align="left">
    {children}
  </ListTypography>
);

export const List = React.forwardRef<HTMLUListElement, Props>(function List(
  { items, id },
  ref,
) {
  return (
    <Code>
      <Grid ref={ref} item container component="ul">
        {items.map((item, i) => {
          if (Array.isArray(item)) {
            const [firstItem, ...rest] = item;
            return (
              <ListItem key={`${id}-item-${i}`}>
                {firstItem}
                <ListTypography
                  key={`${id}-item-${i}-ul`}
                  component="ul"
                  variant="body2"
                  align="left"
                >
                  {rest.map((sub, j) => (
                    <ListItem key={`${id}-subItem-${j}`}>{sub}</ListItem>
                  ))}
                </ListTypography>
              </ListItem>
            );
          }
          return <ListItem key={`${id}-item-${i}`}>{item}</ListItem>;
        })}
      </Grid>
    </Code>
  );
});
