import React from 'react';

import { useWallet } from '../lib/wallet';
import { useBasketsWithClasses } from '../hooks';
import {
  PortfolioTemplate,
  WithBasketsProps,
  withBaskets,
} from '../components/templates';

const WrappedMyEcocredits: React.FC<WithBasketsProps> = ({ baskets }) => {
  const walletContext = useWallet();
  const accountAddress = walletContext.wallet?.address;
  const basketWithClasses = useBasketsWithClasses(baskets);

  return (
    <PortfolioTemplate
      own
      baskets={baskets}
      basketsWithClasses={basketWithClasses}
      accountAddress={accountAddress}
    />
  );
};

export const MyEcocredits = withBaskets(WrappedMyEcocredits);
