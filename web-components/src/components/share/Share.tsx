import { Box, BoxProps } from '@mui/material';

import { ShareItem } from './Share.Item';
import { SocialItems } from './Share.types';

export interface Props extends BoxProps {
  title: string;
  items: SocialItems;
}

const Share = ({ title, items, ...props }: Props): JSX.Element => {
  return (
    <Box {...props}>
      {title}
      {items.map((item, index) => (
        <ShareItem key={item.name} item={item} />
      ))}
    </Box>
  );
};

export { Share };
