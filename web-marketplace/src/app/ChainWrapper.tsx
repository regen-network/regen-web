'use client';
import { wallets } from '@cosmos-kit/keplr-mobile';
import { ChainProvider } from '@cosmos-kit/react-lite';
import { assets, chains } from 'chain-registry';

import {
  WALLET_CONNECT_RELAY_URL,
  walletConnectClientMeta,
} from 'lib/wallet/wallet.constants';

import { LoginModalMobile } from 'components/organisms/LoginModal/components/LoginModal.Mobile';

export function ChainWrapper({ children }: React.PropsWithChildren) {
  return (
    <ChainProvider
      chains={chains.filter(chain => chain.chain_name === 'regen')}
      assetLists={assets.filter(chain => chain.chain_name === 'regen')}
      wallets={wallets}
      walletModal={LoginModalMobile}
      walletConnectOptions={{
        signClient: {
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
          relayUrl: WALLET_CONNECT_RELAY_URL,
          metadata: walletConnectClientMeta,
        },
      }}
    >
      {children}
    </ChainProvider>
  );
}
