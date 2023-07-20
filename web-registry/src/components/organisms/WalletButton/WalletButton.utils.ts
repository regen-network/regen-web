import {
  isAndroid as checkIsAndroid,
  isMobile as checkIsMobile,
} from '@walletconnect/browser-utils';

import { Wallet } from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import {
  getAllWalletsUiConfig,
  GetWalletsUiConfigParams,
} from './WalletButton.config';
import { mobileWalletsName } from './WalletButton.constants';

/* getWalletsUiConfig */

export const getWalletsUiConfig = ({
  connectToWallet,
}: GetWalletsUiConfigParams): Wallet[] => {
  const walletsUiConfig = getAllWalletsUiConfig({
    connectToWallet,
  });

  if (checkIsMobile()) {
    return walletsUiConfig.filter(wallet =>
      mobileWalletsName.includes(wallet.name),
    );
  }

  return walletsUiConfig;
};

/* getMobileConnectUrl */

type GetMobileConnectUrlParams = {
  uri?: string;
};

export const getMobileConnectUrl = ({
  uri,
}: GetMobileConnectUrlParams): string | undefined => {
  if (checkIsMobile() && uri) {
    return checkIsAndroid()
      ? // Deeplink Android: intent://path/#Intent;scheme=yourapp;package=com.yourapp.example;end;
        `intent://wcV1?${uri}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;`
      : // Deeplink iOS: yourapp://path
        `keplrwallet://wcV1?${uri}`;
  }

  return undefined;
};
