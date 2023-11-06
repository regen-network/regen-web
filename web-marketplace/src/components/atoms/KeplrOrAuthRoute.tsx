import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

interface Props {
  component: React.ComponentType<React.PropsWithChildren<unknown>>;
}

const KeplrOrAuthRoute = ({ component: Component }: Props): JSX.Element => {
  const { loaded: walletLoaded, isConnected } = useWallet();
  const { loading: authLoading, activeAccountId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !activeAccountId && walletLoaded && !isConnected) {
      navigate('/login');
    }
  }, [navigate, authLoading, activeAccountId, walletLoaded, isConnected]);

  return (
    <Box sx={{ minHeight: 600 }}>
      {(activeAccountId || isConnected) && <Component />}
    </Box>
  );
};

export { KeplrOrAuthRoute };
