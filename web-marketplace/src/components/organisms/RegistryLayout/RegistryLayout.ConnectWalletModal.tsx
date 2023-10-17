import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';

import { connectWalletModalAtom } from 'lib/atoms/modals.atoms';
import { useWallet } from 'lib/wallet/wallet';

import { ConnectWalletModal } from './components/ConnectWalletModal/ConnectWalletModal';

export const RegistryLayoutConnectWalletModal = (): JSX.Element => {
  const [connectWalletModal, setConnectWalletModal] = useAtom(
    connectWalletModalAtom,
  );
  const { loaded, isConnected } = useWallet();
  const { open, onClose } = connectWalletModal;

  const onCloseModal = useCallback(() => {
    setConnectWalletModal(atom => void (atom.open = false));
    if (onClose && !isConnected) onClose();
  }, [setConnectWalletModal, onClose, isConnected]);

  useEffect(() => {
    if (loaded && isConnected) onCloseModal();
  }, [isConnected, loaded, onCloseModal]);

  return (
    <>
      {connectWalletModal && (
        <ConnectWalletModal open={open ?? false} onClose={onCloseModal} />
      )}
    </>
  );
};
