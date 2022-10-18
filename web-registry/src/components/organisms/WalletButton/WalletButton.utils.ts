import { isMobile as checkIsMobile } from '@walletconnect/browser-utils';

import {
  Wallet,
  WalletModalState,
} from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import { UseStateSetter } from 'types/react/use-state';

import { getAllWalletsUiConfig } from './WalletButton.config';

type GetWalletsUiConfigParams = {
  setModalState: UseStateSetter<WalletModalState>;
  connectToWallet: () => Promise<void>;
};

const mobileWalletsName = ['WalletConnect'];

export const getWalletsUiConfig = ({
  connectToWallet,
  setModalState,
}: GetWalletsUiConfigParams): Wallet[] => {
  const walletsUiConfig = getAllWalletsUiConfig({
    connectToWallet,
    setModalState,
  });

  if (checkIsMobile()) {
    return walletsUiConfig.filter(wallet =>
      mobileWalletsName.includes(wallet.name),
    );
  }

  return walletsUiConfig;
};
