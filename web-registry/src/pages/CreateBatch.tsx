import React from 'react';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

import { chainId } from '../lib/ledger';
import { useWallet } from '../lib/wallet';

import { CreateBatchBySteps } from '../features/ecocredit/CreateBatchBySteps';

const errorMsg = 'Please connect to Keplr to use Regen Ledger features';

const CreateBatch: React.FC = () => {
  const { loaded, wallet } = useWallet();

  if (!chainId || !wallet?.address) {
    return loaded ? <ErrorBanner text={errorMsg} /> : null; // TODO: some empty section
  }

  return <CreateBatchBySteps />;
};

export { CreateBatch };
