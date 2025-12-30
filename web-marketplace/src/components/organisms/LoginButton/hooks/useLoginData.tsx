import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLingui } from '@lingui/react';
import { DRAFT_ID } from 'legacy-pages/Dashboard/MyProjects/MyProjects.constants';
import { useRouter } from 'next/navigation';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

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
  const { _ } = useLingui();
  const { wallet, connect } = useWallet();
  // const { walletRepos } = useManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState<LoginModalState>('select');

  const { activeAccountId } = useAuth();
  const router = useRouter();

  const onButtonClick = useCallback(
    (): void => setIsModalOpen(true),
    [setIsModalOpen],
  );

  const onModalClose = useCallback((): void => {
    setIsModalOpen(false);
    setModalState('select');
  }, [setIsModalOpen, setModalState]);

  const connectToWallet = useConnectToWallet({
    isConnectingRef,
    onModalClose,
    setModalState,
    connect,
  });

  const walletsUiConfig = useMemo(
    () =>
      getWalletsUiConfig({
        connectToWallet,
        _,
      }),
    [connectToWallet, _],
  );

  useResetModalOnConnect({ setIsModalOpen, setModalState, wallet });

  useEffect(() => {
    if (isConnectingRef?.current && activeAccountId) {
      if (createProject) router.push(`/project-pages/${DRAFT_ID}/account`);
      isConnectingRef.current = false;
    }
  }, [activeAccountId, createProject, isConnectingRef, router]);

  return {
    isModalOpen,
    walletsUiConfig,
    modalState,
    onButtonClick,
    onModalClose,
  };
};
