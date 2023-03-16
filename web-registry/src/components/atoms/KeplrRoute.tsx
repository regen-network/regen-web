import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { chainId } from 'lib/ledger';
import { useWallet } from 'lib/wallet/wallet';

interface Props {
  component: React.ComponentType<React.PropsWithChildren<unknown>>;
}

const KeplrRoute = ({ component: Component }: Props): JSX.Element => {
  const { loaded, wallet } = useWallet();
  const navigate = useNavigate();
  const connected = chainId && wallet?.address;

  useEffect(() => {
    if (loaded && !connected) navigate('/connect-wallet');
  }, [connected, navigate, loaded]);

  return <Box sx={{ minHeight: 600 }}>{connected && <Component />}</Box>;
};

export { KeplrRoute };
