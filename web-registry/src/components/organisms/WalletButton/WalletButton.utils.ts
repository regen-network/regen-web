import {
  isAndroid as checkIsAndroid,
  isMobile as checkIsMobile,
} from '@walletconnect/browser-utils';

import {
  Wallet,
  WalletModalState,
} from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import { UseStateSetter } from 'types/react/use-state';
import { ConnectParams } from 'lib/wallet/wallet.types';

import { getAllWalletsUiConfig } from './WalletButton.config';

const mobileWalletsName = ['WalletConnect'];

/* getWalletsUiConfig */

type GetWalletsUiConfigParams = {
  connectToWallet: (params: ConnectParams) => Promise<void>;
};

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
  if (checkIsMobile()) {
    return checkIsAndroid()
      ? `intent://wcV1?${uri}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;`
      : `keplrwallet://wcV1?${uri}`;
  }

  return undefined;
};
