import { Wallet } from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import { ConnectParams } from 'lib/wallet/wallet.types';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

type GetWalletsUiConfigParams = {
  connectToWallet: (params: ConnectParams) => Promise<void>;
};

export const getAllWalletsUiConfig = ({
  connectToWallet,
}: GetWalletsUiConfigParams): Wallet[] => [
  {
    name: 'Keplr Wallet',
    description: 'Keplr Chrome Extension',
    imageUrl: '/png/wallets/keplr-wallet-extension.png',
    onClick: () => connectToWallet({ walletType: WalletType.Keplr }),
  },
  {
    name: 'WalletConnect',
    description: 'Keplr Mobile',
    imageUrl: '/png/wallets/walletconnect-keplr.png',
    onClick: () =>
      connectToWallet({ walletType: WalletType.WalletConnectKeplr }),
  },
];
