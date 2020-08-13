import React from 'react';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import Code from 'containers/Code';

type item = string | string[];
type foobar = '';
type items = item[];

type Props = {
  /** Array consisting of either strings or arrays of strings */
  items: items;
  /** id for list items */
  id?: string;
};

type ItemsProps = {
  item: item;
  id?: string;
};

const ListTypography: typeof Typography = styled(Typography)`
  width: 100%;
  &:not(:last-child) {
    padding-bottom: 0.5rem;
  }
`;

export const ListItem: React.FC = ({ children }) => (
  <ListTypography component="li" variant="body2" align="left">
    {children}
  </ListTypography>
);

const Items = ({ item, id }: ItemsProps) => {
  if (Array.isArray(item)) {
    const [firstItem, ...rest] = item;
    return (
      <ListItem>
        {firstItem}
        <ListTypography component="ul" variant="body2" align="left">
          {rest.map((sub, j) => (
            <ListItem key={`${id}-subItem-${j}`}>{sub}</ListItem>
          ))}
        </ListTypography>
      </ListItem>
    );
  }
  return <ListItem>{item}</ListItem>;
};

const mapItems = (items: items, id?: string) =>
  items.map((item, i) => (
    <Items key={`item-${id}-${i.toString()}`} item={item} id={id} />
  ));

export const List = React.forwardRef<HTMLUListElement, Props>(function List(
  { items, id },
  ref,
) {
  return (
    <Code>
      <Grid ref={ref} item container component="ul">
        {mapItems(items, id)}
      </Grid>
    </Code>
  );
});
