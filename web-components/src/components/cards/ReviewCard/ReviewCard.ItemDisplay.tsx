import React, { ReactNode } from 'react';
<<<<<<< HEAD
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
=======
import { SxProps } from '@mui/material';
import { FlexCol } from '../../box';
import type { Theme } from '~/theme/muiTheme';

import { Subtitle, Body } from '../../typography';

export const ItemDisplay = (props: {
  name: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}): JSX.Element => {
  const { name, children, sx = [] } = props;
  return (
    <FlexCol sx={[{ gap: 2 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Subtitle size="lg">{name}</Subtitle>
      <Body size="lg">{children}</Body>
    </FlexCol>
  );
};
>>>>>>> 7755e82f (Feat: Create credit class UI + absolute paths, storybook in registry (#1044))
