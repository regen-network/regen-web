import { useTheme } from '@mui/material';

import { Subtitle } from '../typography';

const MarketplaceLaunchBanner = (): JSX.Element => {
  const theme = useTheme();
  const bannerColor = theme.palette.secondary.dark;
  return (
    <div
      style={{
        textAlign: 'center',
        color: theme.palette.primary.main,
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
        <a
          href="https://app.regen.network"
          style={{
            color: theme.palette.primary.main,
            textDecorationLine: 'underline',
          }}
        >
          Regen Marketplace
        </a>{' '}
        has launched!
      </Subtitle>
    </div>
  );
};

export default MarketplaceLaunchBanner;
