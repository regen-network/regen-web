import { Link, useTheme } from '@mui/material';

import { Subtitle } from '../typography';

const MarketplaceLaunchBanner = (): JSX.Element => {
  const theme = useTheme();
  const bannerColor = theme.palette.secondary.dark;
  return (
    <div
      style={{
        textAlign: 'center',
        backgroundColor: bannerColor,
        paddingTop: 25,
        paddingBottom: 25,
        borderBottom: `5px solid {bannerColor}`,
      }}
    >
      <Subtitle sx={{ color: 'primary.main' }}>
        <span role="img" aria-label="marketplace launch">
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
    </div>
  );
};

export default MarketplaceLaunchBanner;
