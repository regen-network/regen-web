import React, { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

import { Subtitle, Body } from '../../typography';

const ItemDisplay: React.FC<{
  name?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}> = props => {
  const { name, children, sx = [] } = props;
  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          mt: 9,
          mb: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Subtitle size="lg">{name}</Subtitle>
      <Body size="lg">{children}</Body>
    </Box>
  );
};

export { ItemDisplay };
