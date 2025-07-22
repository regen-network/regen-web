import { ChainWrapper } from 'app/ChainWrapper';

import { LedgerProviderWithWallet } from 'ledger';
import { WalletProvider } from 'lib/wallet/wallet';

import { LayoutFooter } from 'components/layout/Layout.Footer';
import { LayoutHeader } from 'components/layout/Layout.Header';

type Props = {
  children: React.ReactNode;
};

export const RegenProviders = ({ children }: Props) => {
  return (
    <ChainWrapper>
      <WalletProvider>
        <LedgerProviderWithWallet>
          <LayoutHeader />
          <main className="min-h-screen">{children}</main>
          <LayoutFooter />
        </LedgerProviderWithWallet>
      </WalletProvider>
    </ChainWrapper>
  );
};
