import { WalletType } from './walletsConfig/walletsConfig.types';

export type ConnectWalletParams = {
  walletType: WalletType;
  doLogin?: boolean;
  doLogout?: boolean;
  navigateCreateProject?: () => void;
};

export type ConnectParams = {
  walletType: WalletType;
  doLogin?: boolean;
  navigateCreateProject?: () => void;
};
