import { useCallback } from 'react';
import { useChain, useChainWallet } from '@interchain-kit/react';

import { UseStateSetter } from 'types/react/use-state';
import { WalletContextType } from 'lib/wallet/wallet';
import { WALLET_CONNECT } from 'lib/wallet/wallet.constants';
import { ConnectParams } from 'lib/wallet/wallet.types';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import { LoginModalState } from 'components/organisms/LoginModal/LoginModal.types';

type Props = {
  connect?: WalletContextType['connect'];
  setModalState: UseStateSetter<LoginModalState>;
  onModalClose: () => void;
  isConnectingRef?: React.MutableRefObject<boolean>;
};

type Response = ({ walletType }: ConnectParams) => Promise<void>;

export const useConnectToWallet = ({
  connect,
  onModalClose,
  isConnectingRef,
}: Props): Response => {
  const { openView } = useChain('regen');
  const { connect: connectWalletConnect } = useChainWallet(
    'regen',
    WALLET_CONNECT,
  );

  const connectToWallet = useCallback(
    async ({ walletType }: ConnectParams): Promise<void> => {
      if (connect && walletType === WalletType.Keplr) {
        await connect({ walletType });
        if (isConnectingRef) isConnectingRef.current = true;
        onModalClose();
      }
      if (walletType === WalletType.WalletConnectKeplr) {
        onModalClose();
        // openView();
        connectWalletConnect();
      }
    },
    [connect, connectWalletConnect, isConnectingRef, onModalClose, openView],
  );

  return connectToWallet;
};
