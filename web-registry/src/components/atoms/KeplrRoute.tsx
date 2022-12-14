import React from 'react';
import { Box } from '@mui/material';
import { ERROR_BANNER } from 'config/contents';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

import { chainId } from 'lib/ledger';
import { useWallet } from 'lib/wallet/wallet';

interface Props {
  component: React.ComponentType<React.PropsWithChildren<unknown>>;
}

const KeplrRoute = ({ component: Component }: Props): JSX.Element => {
  const { loaded, wallet } = useWallet();

  const connected = chainId && wallet?.address;
  // this helps avoid flashing the error banner on refresh
  const displayErrorBanner = !connected && loaded;

  return (
    <Box sx={{ minHeight: 600 }}>
      {connected && <Component />}
      {displayErrorBanner && <ErrorBanner text={ERROR_BANNER} />}
    </Box>
  );
};

export { KeplrRoute };
