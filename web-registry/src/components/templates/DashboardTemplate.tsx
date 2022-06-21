import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

export const DashboardTemplate = ({
  children,
  sx = [],
}: {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}): JSX.Element => (
  <Box
    sx={[{ pb: { xs: 21.25, sm: 28.28 } }, ...(Array.isArray(sx) ? sx : [sx])]}
  >
    {children}
  </Box>
);
