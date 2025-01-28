import { useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';

import { chooseHowToPurchaseModalAtom } from 'lib/atoms/modals.atoms';
import { useWallet } from 'lib/wallet/wallet';

import { ChooseHowToPurchaseModal } from 'components/organisms/ChooseHowToPurchaseModal/ChooseHowToPurchaseModal';

export const RegistryLayoutChooseHowToPurchaseModal = (): JSX.Element => {
  const [chooseHowToPurchaseModal, setChooseHowToPurchaseModal] = useAtom(
    chooseHowToPurchaseModalAtom,
  );
  const { open, onClose, projectId } = chooseHowToPurchaseModal;
  const { isConnected } = useWallet();

  const onCloseModal = useCallback(() => {
    setChooseHowToPurchaseModal(atom => void (atom.open = false));
    if (onClose) onClose();
  }, [setChooseHowToPurchaseModal, onClose]);

  useEffect(() => {
    if (isConnected) {
      onCloseModal();
    }
  }, [isConnected, onCloseModal]);

  return (
    <ChooseHowToPurchaseModal
      open={open ?? false}
      onClose={onCloseModal}
      projectId={projectId || ''}
    />
  );
};
