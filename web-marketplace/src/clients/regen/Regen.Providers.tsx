'use client';

import { ChainWrapper } from 'app/ChainWrapper';

import { LedgerProviderWithWallet } from 'ledger';
import { WalletProvider } from 'lib/wallet/wallet';

type Props = {
  children: React.ReactNode;
};

export const RegenProviders = ({ children }: Props) => {
  return (
    <ChainWrapper>
      <WalletProvider>
        <LedgerProviderWithWallet>{children}</LedgerProviderWithWallet>
      </WalletProvider>
    </ChainWrapper>
  );
};
