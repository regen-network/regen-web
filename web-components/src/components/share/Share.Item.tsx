import { Box, BoxProps } from '@mui/material';

import { Body } from '../typography';
import { SocialItem } from './Share.types';

interface Props extends BoxProps {
  item: SocialItem;
}

export const ShareItem = ({ item, ...props }: Props): JSX.Element => (
  <Box {...props}>
    <Box>{item.icon}</Box>
    <Body>{item.name}</Body>
  </Box>
);
