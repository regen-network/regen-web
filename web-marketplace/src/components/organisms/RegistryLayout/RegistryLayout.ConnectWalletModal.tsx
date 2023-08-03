import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';

import { connectWalletModalAtom } from 'lib/atoms/modals.atoms';
import { useWallet } from 'lib/wallet/wallet';

import { ConnectWalletModal } from './components/ConnectWalletModal/ConnectWalletModal';

export const RegistryLayoutConnectWalletModal = (): JSX.Element => {
  const [connectWalletModal, setConnectWalletModal] = useAtom(
    connectWalletModalAtom,
  );
  const { loaded, wallet } = useWallet();
  const connected = wallet?.address;
  const { open, onClose } = connectWalletModal;

  const onCloseModal = useCallback(() => {
    setConnectWalletModal(atom => void (atom.open = false));
    if (onClose && !connected) onClose();
  }, [setConnectWalletModal, onClose, connected]);

  useEffect(() => {
    if (loaded && connected) onCloseModal();
  }, [connected, loaded, onCloseModal]);

  return (
    <>
      {connectWalletModal && (
        <ConnectWalletModal open={open ?? false} onClose={onCloseModal} />
      )}
    </>
  );
};
