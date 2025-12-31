'use client';
import {
  ExtensionWallet,
  selectWalletByPlatform,
  WCCosmosWallet,
  WCWallet,
  CosmosWallet,
  isMobile,
  WCMobileWebWallet,
} from '@interchain-kit/core';
import { ChainProvider, InterchainWalletModal } from '@interchain-kit/react';
import { assetLists, chains } from 'chain-registry';

import {
  walletConnectClientMeta,
  walletConnectOption,
  keplrExtensionInfo,
} from 'lib/wallet/wallet.constants';

import { LoginModalMobile } from 'components/organisms/LoginModal/components/LoginModal.Mobile';
// import { WCMobileWebWallet } from 'lib/wallet/wc-mobile-web-wallet';

const desktopWalletConnect = new WCWallet(walletConnectOption, {
  metadata: walletConnectClientMeta,
});
desktopWalletConnect.setNetworkWallet('cosmos', new WCCosmosWallet());

const mobileWalletConnect = new WCMobileWebWallet(keplrExtensionInfo, {
  metadata: walletConnectClientMeta,
});

export function ChainWrapper({ children }: React.PropsWithChildren) {
  return (
    <ChainProvider
      chains={chains.filter(chain => chain.chainName === 'regen')}
      assetLists={assetLists.filter(chain => chain.chainName === 'regen')}
      wallets={[isMobile() ? mobileWalletConnect : desktopWalletConnect]}
      // walletModal={props => <LoginModalMobile {...props} />}
    >
      {children}
      <InterchainWalletModal />
    </ChainProvider>
  );
}
