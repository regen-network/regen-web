import { LedgerProvider } from 'ledger';

import { LayoutSharedComponents } from 'components/layout/Layout.SharedComponents';
import { RegistryLayoutTerrasosFooter } from 'components/organisms/RegistryLayout/RegistryLayout.TerrasosFooter';
import { TerrasosHeader } from 'components/organisms/TerrasosHeader/TerrasosHeader';

type Props = {
  children: React.ReactNode;
};

export const TerrasosProviders = ({ children }: Props) => {
  return (
    <LedgerProvider>
      <TerrasosHeader />
      <main className="min-h-screen">{children}</main>
      <RegistryLayoutTerrasosFooter />
      <LayoutSharedComponents />
    </LedgerProvider>
  );
};
