import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useManager } from '@cosmos-kit/react-lite';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { useProfileItems } from 'pages/Dashboard/hooks/useProfileItems';
import { DRAFT_ID } from 'pages/Dashboard/MyProjects/MyProjects.constants';
import { LoginModalState } from 'components/organisms/LoginModal/LoginModal.types';

import { getWalletsUiConfig } from '../LoginButton.utils';
import { useConnectToWallet } from './useConnectToWallet';
import { useResetModalOnConnect } from './useResetModalOnConnect';

export const useLoginData = ({
  createProject,
  isConnectingRef,
}: {
  createProject?: boolean;
  isConnectingRef?: React.MutableRefObject<boolean>;
}) => {
  const { wallet, connect } = useWallet();
  const { walletRepos } = useManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<LoginModalState>('select');

  const { isIssuer, isLoadingIsIssuer } = useProfileItems({});
  const { activeAccountId } = useAuth();
  const navigate = useNavigate();

  const onButtonClick = useCallback(
    (): void => setIsModalOpen(true),
    [setIsModalOpen],
  );

  const onModalClose = useCallback((): void => {
    setIsModalOpen(false);
    setModalState('select');
  }, []);

  const connectToWallet = useConnectToWallet({
    isConnectingRef,
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

  useEffect(() => {
    if (!isLoadingIsIssuer && isConnectingRef?.current && activeAccountId) {
      if (createProject)
        navigate(
          `/project-pages/${DRAFT_ID}/${
            isIssuer ? 'choose-credit-class' : 'basic-info'
          }`,
        );
      isConnectingRef.current = false;
    }
  }, [
    activeAccountId,
    createProject,
    isConnectingRef,
    isIssuer,
    isLoadingIsIssuer,
    navigate,
  ]);

  return {
    isModalOpen,
    walletsUiConfig,
    modalState,
    onButtonClick,
    onModalClose,
  };
};
