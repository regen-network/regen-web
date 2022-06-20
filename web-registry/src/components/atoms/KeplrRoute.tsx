import React from 'react';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

import { chainId } from '../../lib/ledger';
import { useWallet } from '../../lib/wallet';

interface Props {
  component: React.ComponentType;
}

const KeplrRoute = ({ component: Component }: Props): JSX.Element | null => {
  const { loaded, wallet } = useWallet();

  return chainId && wallet?.shortAddress ? (
    <Component />
  ) : loaded ? ( // <-- this helps avoid flashing the error banner on refresh
    <ErrorBanner text="Please connect to Keplr to use Regen Ledger features" />
  ) : null;
};

export { KeplrRoute };
