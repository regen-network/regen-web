import React from 'react';
import { Box, CircularProgress, SxProps } from '@mui/material';
import { Theme } from '~/theme/muiTheme';

/** simpler loader with a minimum height of 150 px
 * @param sx - additional styles for container
 */
export const Loading: React.FC<{ sx?: SxProps<Theme> }> = ({ sx }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        minHeight: 150,
        ...sx,
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};
