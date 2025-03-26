import React from 'react';
import { Box, CircularProgress } from '@mui/material';

/**
 * Displays a full screen centered loading spinner
 * Useful for full page loading
 */
const PageLoader: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default PageLoader;
