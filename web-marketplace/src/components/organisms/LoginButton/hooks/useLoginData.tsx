import { useCallback, useMemo, useState } from 'react';
import { useManager } from '@cosmos-kit/react-lite';

import { useWallet } from 'lib/wallet/wallet';

import { LoginModalState } from 'components/organisms/LoginModal/LoginModal.types';

import { getWalletsUiConfig } from '../LoginButton.utils';
import { useConnectToWallet } from './useConnectToWallet';
import { useResetModalOnConnect } from './useResetModalOnConnect';

export const useLoginData = () => {
  const { wallet, connect } = useWallet();

  const { walletRepos } = useManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<LoginModalState>('select');

  const onButtonClick = useCallback(
    (): void => setIsModalOpen(true),
    [setIsModalOpen],
  );

  const onModalClose = useCallback((): void => {
    setIsModalOpen(false);
    setModalState('select');
  }, [setIsModalOpen, setModalState]);

  const connectToWallet = useConnectToWallet({
    onModalClose,
    setModalState,
    connect,
    connectWalletConnect: walletRepos[0]?.connect, // only one walletRepos for regen
  });

  const walletsUiConfig = useMemo(
    () =>
      getWalletsUiConfig({
        connectToWallet,
      }),
    [connectToWallet],
  );

  useResetModalOnConnect({ setIsModalOpen, setModalState, wallet });

  return {
    isModalOpen,
    walletsUiConfig,
    modalState,
    onButtonClick,
    onModalClose,
  };
};
