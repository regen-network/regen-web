import React from 'react';
import { Box, Link } from '@mui/material';

import { Subtitle } from '../typography';

type Props = {};

const bannerColor = '#7BC796';

const MarketplaceLaunchBanner: React.FC<Props> = props => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        backgroundColor: bannerColor,
        py: [4, 5],
        borderBottom: `5px solid ${bannerColor}`, // TODO: this is a hack to get around a weird display glitch that seems to be caused by the mobile drawer
      }}
    >
      <Subtitle sx={{ color: 'primary.main' }}>
        <span role="img" aria-label="mainnet launch">
          🚀
        </span>{' '}
        <Link
          href="https://app.regen.network"
          sx={{ textDecoration: 'underline!important' }}
        >
          Regen Marketplace
        </Link>{' '}
        has launched!
      </Subtitle>
    </Box>
  );
};

export default MarketplaceLaunchBanner;
