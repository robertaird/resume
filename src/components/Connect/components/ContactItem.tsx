import { Link, Typography } from '@material-ui/core';

export const ContactItem = ({ item }: { item: string[] }) => {
  if (item[2]) {
    return (
      <Link href={item[2]} noWrap variant="body2">
        {item[1]}
      </Link>
    );
  }
  return (
    <Typography noWrap variant="body2">
      {item[1]}
    </Typography>
  );
};
