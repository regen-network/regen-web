import React from 'react';
import { Box, CircularProgress, Skeleton, SxProps, Theme } from '@mui/material';

type Variant = 'circular' | 'skeleton';

type Props = {
  isLoading: boolean;
  children: JSX.Element;
  variant?: Variant;
  sx?: SxProps<Theme>;
  className?: string;
};

const WithLoader = ({
  isLoading,
  children,
  variant = 'circular',
  sx,
}: Props): JSX.Element => {
  const isCircular = variant === 'circular';
  const isSkeleton = variant === 'skeleton';

  if (isLoading) {
    return (
      <Box sx={sx}>
        {isCircular && <CircularProgress color="secondary" />}
        {isSkeleton && <Skeleton />}
      </Box>
    );
  }

  return children;
};

export default WithLoader;
