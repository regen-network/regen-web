import React, { ReactNode } from 'react';
<<<<<<< HEAD
import { Box, SxProps, Theme } from '@mui/material';
=======
import { SxProps } from '@mui/material';

import { FlexCol } from '../../box';
import { Body, Subtitle } from '../../typography';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))

import type { Theme } from '~/theme/muiTheme';

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
