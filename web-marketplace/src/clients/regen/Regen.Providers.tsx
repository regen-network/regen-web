import { SharedProviders } from 'clients/Clients.SharedProviders';

import { LedgerProvider } from 'ledger';
import { AuthProvider } from 'lib/auth/auth';
import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';
import { useWallet, WalletProvider } from 'lib/wallet/wallet';

import { RegenRoutes } from './Regen.Routes';

import '../../../../tailwind.css';
import '../../App.css';

export const RegenProvider = () => {
  const { wallet, loaded } = useWallet();
  return (
    <SharedProviders>
      <AuthProvider>
        <WalletProvider>
          <LedgerProvider wallet={wallet} walletLoaded={loaded}>
            <RegenRoutes
              reactQueryClient={reactQueryClient}
              apolloClientFactory={apolloClientFactory}
            />
          </LedgerProvider>
        </WalletProvider>
      </AuthProvider>
    </SharedProviders>
  );
};
