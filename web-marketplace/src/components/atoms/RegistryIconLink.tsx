import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

import RegenMarketIcon from 'web-components/src/components/icons/RegenMarketIcon';

export const RegistryIconLink: React.FC<
  React.PropsWithChildren<{ color: string }>
> = ({ color }) => {
  return (
    <Link to="/">
      <Box
        sx={{
          width: { xs: 62, md: 117 },
          height: { xs: 'auto', md: 77 },
        }}
      >
        <RegenMarketIcon sx={{ color }} />
      </Box>
    </Link>
  );
};
