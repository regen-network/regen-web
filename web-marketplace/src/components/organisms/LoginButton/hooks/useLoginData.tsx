import { useCallback, useEffect, useMemo, useState } from 'react';
import { State, WalletStatus } from '@cosmos-kit/core';
import { useManager } from '@cosmos-kit/react-lite';
import { useAtom } from 'jotai';

import { isWaitingForSigningAtom } from 'lib/atoms/tx.atoms';
import { useWallet } from 'lib/wallet/wallet';

import { LoginModalState } from 'components/organisms/LoginModal/LoginModal.types';

import { getMobileConnectUrl, getWalletsUiConfig } from '../LoginButton.utils';
import { useConnectToWallet } from './useConnectToWallet';
import { useNavigateToMobileUrl } from './useNavigateToMobileUrl';
import { useResetModalOnConnect } from './useResetModalOnConnect';

export const useLoginData = () => {
  const {
    wallet,
    connect,
    loaded: walletLoaded,
    walletConnectUri,
    isConnected,
  } = useWallet();

  const { walletRepos } = useManager();
  const [qrState, setQRState] = useState<State>(State.Init); // state of QRCode

  const current = walletRepos[0]?.current;
  (current?.client as any)?.setActions?.({
    qrUrl: {
      state: setQRState,
    },
  });

  const walletStatus = current?.walletStatus;
  const message = current?.message;
  const qrUrl = current?.qrUrl;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitingForSigning, setIsWaitingForSigningAtom] = useAtom(
    isWaitingForSigningAtom,
  );
  const [modalState, setModalState] = useState<LoginModalState>('select');
  const [connecting, setConnecting] = useState<boolean>(false);
  const [qrCodeUri, setQrCodeUri] = useState<string | undefined>();
  const isConnectedLoaded = walletLoaded ? isConnected : null;

  useEffect(() => {
    if (isModalOpen) {
      setConnecting(
        walletStatus === WalletStatus.Connecting && qrState === State.Init,
      );
      setQrCodeUri(qrUrl?.data);
    }
  }, [isModalOpen, qrState, walletStatus, qrUrl?.data, message]);

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
  const mobileConnectUrl = useMemo(
    () => getMobileConnectUrl({ uri: walletConnectUri }),
    [walletConnectUri],
  );

  useNavigateToMobileUrl({
    mobileConnectUrl,
    isWaitingForSigning,
    isConnected: isConnectedLoaded,
  });

  useResetModalOnConnect({ setIsModalOpen, setModalState, wallet });

  return {
    isModalOpen,
    walletsUiConfig,
    modalState,
    qrCodeUri,
    connecting,
    onButtonClick,
    onModalClose,
    isWaitingForSigning,
    setIsWaitingForSigningAtom,
  };
};
