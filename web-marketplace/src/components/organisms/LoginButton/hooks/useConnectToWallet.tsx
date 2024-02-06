import { useCallback } from 'react';
import { WalletRepo } from '@cosmos-kit/core';
import { useChain } from '@cosmos-kit/react-lite';

import { UseStateSetter } from 'types/react/use-state';
import { WalletContextType } from 'lib/wallet/wallet';
import { KEPLR_MOBILE } from 'lib/wallet/wallet.constants';
import { ConnectParams } from 'lib/wallet/wallet.types';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { LoginModalState } from 'components/organisms/LoginModal/LoginModal.types';

type Props = {
  connect?: WalletContextType['connect'];
  connectWalletConnect?: WalletRepo['connect'];
  setModalState: UseStateSetter<LoginModalState>;
  onModalClose: () => void;
};

type Response = ({ walletType }: ConnectParams) => Promise<void>;

export const useConnectToWallet = ({
  connect,
  connectWalletConnect,
  onModalClose,
}: Props): Response => {
  const { openView } = useChain('regen');
  const connectToWallet = useCallback(
    async ({ walletType }: ConnectParams): Promise<void> => {
      if (connect && walletType === WalletType.Keplr) {
        await connect({ walletType });
        onModalClose();
      }
      if (
        connectWalletConnect &&
        walletType === WalletType.WalletConnectKeplr
      ) {
        onModalClose();
        openView();
        await connectWalletConnect(KEPLR_MOBILE, true);
      }
    },
    [connect, connectWalletConnect, onModalClose, openView],
  );

  return connectToWallet;
};
