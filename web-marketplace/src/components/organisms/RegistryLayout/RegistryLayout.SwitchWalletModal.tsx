import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';

import { SwitchWalletWarningModal } from 'web-components/src/components/modal/SwitchWalletWarningModal/SwitchWalletWarningModal';

import { switchWalletModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

export const RegistryLayoutSwitchWalletModal = (): JSX.Element => {
  const [switchWalletModal, setSwitchWalletModal] = useAtom(
    switchWalletModalAtom,
  );
  const { activeAccount } = useAuth();
  const { open, onClose } = switchWalletModal;
  const { isConnected } = useWallet();

  const onCloseModal = useCallback(() => {
    setSwitchWalletModal(atom => void (atom.open = false));
    if (onClose) onClose();
  }, [setSwitchWalletModal, onClose]);

  useEffect(() => {
    if (isConnected) {
      onCloseModal();
    }
  }, [isConnected, onCloseModal]);

  return (
    <SwitchWalletWarningModal
      open={open ?? false}
      address={String(activeAccount?.addr)}
      onClose={onCloseModal}
    />
  );
};
