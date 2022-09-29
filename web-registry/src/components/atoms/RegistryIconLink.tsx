import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

import RegenMarketIcon from 'web-components/lib/components/icons/RegenMarketIcon';

export const RegistryIconLink: React.FC<{ color: string }> = ({ color }) => {
  return (
    <Link to="/">
      <Box
        sx={{
          width: { xs: 100, sm: 117 },
          height: { xs: 'auto', sm: 77 },
        }}
      >
        <RegenMarketIcon sx={{ color }} />
      </Box>
    </Link>
  );
};
