import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';

interface Props {
  /** Array consisting of either strings or arrays of strings */
  items: (string | string[])[];
  /** id for list items */
  id?: string;
}

const ListTypography = styled(Typography)`
  width: 100%;
`;

export const ListItem: React.FC = ({ children }) => (
  <ListTypography component="li" variant="body2" align="left">
    {children}
  </ListTypography>
);

export const List: React.FC<Props> = ({ items, id }) => (
  <Grid item container component="ul">
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
);
