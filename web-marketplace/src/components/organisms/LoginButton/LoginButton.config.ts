import { msg } from '@lingui/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';
import { ConnectParams } from 'lib/wallet/wallet.types';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { LoginProvider } from '../LoginModal/LoginModal.types';

export type GetWalletsUiConfigParams = {
  connectToWallet: (params: ConnectParams) => Promise<void>;
  _: TranslatorType;
};

export const getAllWalletsUiConfig = ({
  connectToWallet,
  _,
}: GetWalletsUiConfigParams): LoginProvider[] => [
  {
    // eslint-disable-next-line lingui/no-unlocalized-strings
    name: 'Keplr Wallet',
    description: _(msg`Keplr Chrome Extension`),
    imageUrl: '/png/wallets/keplr-wallet-extension.png',
    onClick: () => connectToWallet({ walletType: WalletType.Keplr }),
  },
  {
    // eslint-disable-next-line lingui/no-unlocalized-strings
    name: 'WalletConnect',
    description: _(msg`Keplr Mobile`),
    imageUrl: '/png/wallets/walletconnect-keplr.png',
    onClick: () =>
      connectToWallet({ walletType: WalletType.WalletConnectKeplr }),
  },
];
