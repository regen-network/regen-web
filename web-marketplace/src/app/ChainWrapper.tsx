'use client';
import { WCCosmosWallet, WCWallet } from '@interchain-kit/core';
import { ChainProvider } from '@interchain-kit/react';
import { assetLists, chains } from 'chain-registry';

import {
  walletConnectClientMeta,
  walletConnectOption,
} from 'lib/wallet/wallet.constants';

import { LoginModalMobile } from 'components/organisms/LoginModal/components/LoginModal.Mobile';

const desktopWalletConnect = new WCWallet(walletConnectOption, {
  metadata: walletConnectClientMeta,
});
desktopWalletConnect.setNetworkWallet('cosmos', new WCCosmosWallet());

export function ChainWrapper({ children }: React.PropsWithChildren) {
  return (
    <ChainProvider
      chains={chains.filter(chain => chain.chainName === 'regen')}
      assetLists={assetLists.filter(chain => chain.chainName === 'regen')}
      wallets={[desktopWalletConnect]}
      walletModal={props => <LoginModalMobile {...props} />}
    >
      {children}
    </ChainProvider>
  );
}
