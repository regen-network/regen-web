import { useEffect } from 'react';

import { WalletModalState } from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import { UseStateSetter } from 'types/react/use-state';
import { Wallet } from 'lib/wallet/wallet';

type Props = {
  wallet?: Wallet;
  setModalState: UseStateSetter<WalletModalState>;
  setIsModalOpen: UseStateSetter<boolean>;
};

export const useResetModalOnConnect = ({
  setIsModalOpen,
  setModalState,
  wallet,
}: Props): void => {
  useEffect(() => {
    if (wallet?.address) {
      setModalState('wallet-select');
      setIsModalOpen(false);
    }
  }, [wallet?.address, setIsModalOpen, setModalState]);
};
