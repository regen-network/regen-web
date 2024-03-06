import React from 'react';
import { Box } from '@mui/material';

import { LockIcon } from '../../icons/LockIcon';
import { Subtitle } from '../../typography';

const PrivateBadge = ({ hasImageBlock }: { hasImageBlock?: boolean }) => (
  <Box
    sx={{
      borderRadius: 1,
      backgroundColor: theme => theme.palette.error.dark,
      position: 'absolute',
      left: hasImageBlock ? 12 : undefined,
      right: hasImageBlock ? undefined : [80, 90],
      top: hasImageBlock ? 12 : [30, 40],
      display: 'flex',
      alignItems: 'center',
      p: 1.5,
      zIndex: 1,
    }}
  >
    <LockIcon
      sx={{
        color: theme => theme.palette.primary.contrastText,
        height: '18px',
        width: '18px',
      }}
    />
    <Subtitle size="sm" sx={{ pl: 1 }}>
      Post is private
    </Subtitle>
  </Box>
);

export default PrivateBadge;
