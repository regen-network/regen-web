import { wallets } from '@cosmos-kit/keplr-mobile';
import { ChainProvider } from '@cosmos-kit/react-lite';
import { assets, chains } from 'chain-registry';
import { SharedProviders } from 'clients/Clients.SharedProviders';

import { LedgerProviderWithWallet } from 'ledger';
import { AuthProvider } from 'lib/auth/auth';
import { apolloClientFactory } from 'lib/clients/apolloClientFactory';
import { reactQueryClient } from 'lib/clients/reactQueryClient';
import { WalletProvider } from 'lib/wallet/wallet';
import {
  WALLET_CONNECT_RELAY_URL,
  walletConnectClientMeta,
} from 'lib/wallet/wallet.constants';

import { LoginModalMobile } from 'components/organisms/LoginModal/components/LoginModal.Mobile';

import { RegenRoutes } from './Regen.Routes';

import '../../../../tailwind.css';
import '../../App.css';

export const RegenProvider = () => {
  console.log('RegenProvider');
  return (
    <SharedProviders>
      <AuthProvider>
        <ChainProvider
          chains={chains.filter(chain => chain.chain_name === 'regen')}
          assetLists={assets.filter(chain => chain.chain_name === 'regen')}
          wallets={wallets}
          walletModal={LoginModalMobile}
          walletConnectOptions={{
            signClient: {
              projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
              relayUrl: WALLET_CONNECT_RELAY_URL,
              metadata: walletConnectClientMeta,
            },
          }}
        >
          <WalletProvider>
            <LedgerProviderWithWallet>
              <RegenRoutes
                reactQueryClient={reactQueryClient}
                apolloClientFactory={apolloClientFactory}
              />
            </LedgerProviderWithWallet>
          </WalletProvider>
        </ChainProvider>
      </AuthProvider>
    </SharedProviders>
  );
};
