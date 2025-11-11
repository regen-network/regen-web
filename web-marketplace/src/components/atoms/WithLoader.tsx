import React from 'react';
import { Box, CircularProgress, Skeleton, SxProps, Theme } from '@mui/material';

type Variant = 'circular' | 'skeleton';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
  variant?: Variant;
  sx?: SxProps<Theme>;
  className?: string;
};

/**
 * Displays a loading indicator (either circular or skeleton) while the content is loading.
 * Once loading is complete, it renders the provided children.
 */
const WithLoader = ({
  isLoading,
  children,
  variant = 'circular',
  sx,
  className,
}: Props) => {
  const isCircular = variant === 'circular';
  const isSkeleton = variant === 'skeleton';

  if (isLoading) {
    return (
      <Box sx={sx} className={className}>
        {isCircular && <CircularProgress color="secondary" />}
        {isSkeleton && <Skeleton />}
      </Box>
    );
  }

  return children;
};

export default WithLoader;
