import React from 'react';
import { Box, Link } from '@mui/material';

import Countdown from '../countdown';
import { Subtitle } from '../typography';

type Props = {
  launchDate: string;
};

const bannerBlue = '#6D9BDB';

const MainnetLaunchBanner: React.FC<Props> = props => {
  return new Date() < new Date(props.launchDate) ? (
    <Box
      sx={{
        textAlign: 'center',
        backgroundColor: bannerBlue,
        py: [4, 5],
        borderBottom: `5px solid ${bannerBlue}`, // TODO: this is a hack to get around a weird display glitch that seems to be caused by the mobile drawer
      }}
    >
      <Subtitle>
        <span role="img" aria-label="mainnet launch">
          🚀
        </span>{' '}
        <Link href="/mainnet/" sx={{ textDecoration: 'underline' }}>
          Mainnet
        </Link>{' '}
        is launching in <Countdown date={props.launchDate} />
      </Subtitle>
    </Box>
  ) : null;
};

export default MainnetLaunchBanner;
