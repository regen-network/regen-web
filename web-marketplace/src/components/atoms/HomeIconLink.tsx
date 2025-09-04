import React from 'react';
import { Box } from '@mui/material';

import RegenMarketIcon from 'web-components/src/components/icons/RegenMarketIcon';

import { useCurrentLocale } from 'lib/i18n/hooks/useCurrentLocale';

import { Link } from './Link';

/**
 * A clickable logo that links to the homepage (`/`).
 * It renders the `RegenMarketIcon` with a specified color.
 */
export const HomeIconLink = ({ color }: { color: string }) => {
  const locale = useCurrentLocale();
  return (
    <Link href={`/${locale}`}>
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
