import React from 'react';

import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { useWallet } from '../lib/wallet';
import { PortfolioTemplate } from '../components/templates';

export const MyEcocredits: React.FC = () => {
  const walletContext = useWallet();
  const accountAddress = walletContext.wallet?.address;

  return (
    <PortfolioTemplate
      accountAddress={accountAddress}
      renderCreditActionButtons={i => (
        <TableActionButtons
          buttons={[
            // Disabling for now until the marketplace is
            // released on regen-ledger
            // {
            //   label: 'sell',
            //   onClick: () => `TODO sell credit ${i}`,
            // },
            {
              label: 'send',
              onClick: () => `TODO send credit ${i}`,
            },
            {
              label: 'retire',
              onClick: () => `TODO retire credit ${i}`,
            },
          ]}
        />
      )}
      renderBasketActionButtons={i => <TableActionButtons buttons={[]} />}
    />
  );
};
