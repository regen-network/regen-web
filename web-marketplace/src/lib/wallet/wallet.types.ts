import { WalletType } from './walletsConfig/walletsConfig.types';

export type ConnectWalletParams = {
  walletType: WalletType;
  doLogin?: boolean;
};

export type ConnectParams = {
  walletType: WalletType;
  doLogin?: boolean;
};
