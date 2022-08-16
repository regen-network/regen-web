import React from 'react';
import { Box, CircularProgress, SxProps, Theme } from '@mui/material';

type Props = {
  isLoading: boolean;
  children: JSX.Element;
  sx?: SxProps<Theme>;
};

const WithLoader = ({ isLoading, children, sx }: Props): JSX.Element => {
  if (isLoading) {
    return (
      <Box sx={sx}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return children;
};

export default WithLoader;
