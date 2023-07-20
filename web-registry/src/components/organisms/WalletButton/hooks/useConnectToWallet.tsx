import { useCallback } from 'react';

import { WalletModalState } from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import { UseStateSetter } from 'types/react/use-state';
import { WalletContextType } from 'lib/wallet/wallet';
import { ConnectParams } from 'lib/wallet/wallet.types';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

type Props = {
  connect?: WalletContextType['connect'];
  connectWalletConnect?: (sync: boolean) => Promise<void>;
  setModalState: UseStateSetter<WalletModalState>;
  onModalClose: () => void;
};

type Response = ({ walletType }: ConnectParams) => Promise<void>;

export const useConnectToWallet = ({
  connect,
  connectWalletConnect,
  onModalClose,
  setModalState,
}: Props): Response => {
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
        setModalState('wallet-mobile');
        await connectWalletConnect(true);
      }
    },
    [connect, connectWalletConnect, onModalClose, setModalState],
  );

  return connectToWallet;
};
