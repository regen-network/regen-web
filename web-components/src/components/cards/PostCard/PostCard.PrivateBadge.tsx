import React from 'react';
import { Box } from '@mui/material';

import { LockIcon } from '../../icons/LockIcon';
import { Subtitle } from '../../typography';

const PrivateBadge = ({
  hasImageBlock,
  label,
}: {
  hasImageBlock?: boolean;
  label: string;
}) => (
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
    <LockIcon className="h-[18px] w-[18px]" />
    <Subtitle size="sm" sx={{ pl: 1 }}>
      {label}
    </Subtitle>
  </Box>
);

export default PrivateBadge;
