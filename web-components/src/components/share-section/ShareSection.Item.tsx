import { Box, BoxProps } from '@mui/material';

import { Body } from '../typography';
import { SocialItem } from './ShareSection.types';

interface Props extends BoxProps {
  item: SocialItem;
}

export const ShareItem = ({ item, ...props }: Props): JSX.Element => {
  const Icon = item.Icon;
  return (
    <Box {...props}>
      <Box sx={{ mb: 2.5 }}>{<Icon sx={{ fontSize: 50 }} />}</Box>
      <Body>{item.name}</Body>
    </Box>
  );
};
