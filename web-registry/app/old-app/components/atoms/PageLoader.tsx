import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const PageLoader = (): JSX.Element => {
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
