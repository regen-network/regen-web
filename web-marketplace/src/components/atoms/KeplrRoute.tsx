'use client';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { chainId } from 'lib/ledger';
import { useWallet } from 'lib/wallet/wallet';

interface Props {
  component: React.ComponentType<React.PropsWithChildren<unknown>>;
}

/**
 * Renders a page component if user has connected a wallet
 * Redirects to login if not authenticated/connected.
 */
const KeplrRoute = ({ component: Component }: Props): JSX.Element => {
  const { loaded, isConnected } = useWallet();
  const navigate = useNavigate();
  const connected = chainId && isConnected;

  useEffect(() => {
    // Redirect to connect wallet page if wallet loaded and the user doesn't have any connected wallet
    if (loaded && !connected) {
      navigate('/connect-wallet');
    }
  }, [connected, navigate, loaded]);

  return <Box sx={{ minHeight: 600 }}>{connected && <Component />}</Box>;
};

export { KeplrRoute };
