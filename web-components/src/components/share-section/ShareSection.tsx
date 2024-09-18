import { Box, BoxProps, Link } from '@mui/material';

import { Subtitle } from '../typography';
import { ShareItem } from './ShareSection.Item';
import { SocialItems } from './ShareSection.types';

export interface Props extends BoxProps {
  title?: string;
  items: SocialItems;
}

const ShareSection = ({ title, items, sx, ...props }: Props): JSX.Element => {
  return (
    <Box
      component="section"
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
        { textAlign: 'center', width: '100%' },
      ]}
      {...props}
    >
      <Subtitle size="lg" sx={{ mb: 5, color: 'info.dark' }}>
        {title}
      </Subtitle>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        {items.map(item => (
          <Link href={item.href} key={item.name} target="_blank">
            <ShareItem item={item} />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export { ShareSection };
