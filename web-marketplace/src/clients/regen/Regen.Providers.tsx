'use client';

import { ChainWrapper } from 'app/ChainWrapper';
import { usePathname } from 'next/navigation';

import { LedgerProviderWithWallet } from 'ledger';
import { WalletProvider } from 'lib/wallet/wallet';

import { LayoutFooter } from 'components/layout/Layout.Footer';
import { LayoutHeader } from 'components/layout/Layout.Header';

type Props = {
  children: React.ReactNode;
};

export const RegenProviders = ({ children }: Props) => {
  const pathname = usePathname();
  const isFullScreen =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/organizations/create');
  return (
    <ChainWrapper>
      <WalletProvider>
        <LedgerProviderWithWallet>
          {/* TODO: When the /dashboard has been migrated, the LayoutHeader and LayoutFooter 
              should be in a layout component for non-dashboard pages */}
          <div className="min-h-screen flex flex-col">
            {!isFullScreen && <LayoutHeader />}
            <main className="flex-1">{children}</main>
            {!isFullScreen && <LayoutFooter />}
          </div>
        </LedgerProviderWithWallet>
      </WalletProvider>
    </ChainWrapper>
  );
};
