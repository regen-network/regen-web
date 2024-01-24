import { useEffect } from 'react';

import { UseStateSetter } from 'types/react/use-state';
import { Wallet } from 'lib/wallet/wallet';

import { LoginModalState } from 'components/organisms/LoginModal/LoginModal.types';

type Props = {
  wallet?: Wallet;
  setModalState: UseStateSetter<LoginModalState>;
  setIsModalOpen: UseStateSetter<boolean>;
};

export const useResetModalOnConnect = ({
  setIsModalOpen,
  setModalState,
  wallet,
}: Props): void => {
  useEffect(() => {
    console.log('address', wallet?.address)
    if (wallet?.address) {
      setModalState('select');
      setIsModalOpen(false);
    }
  }, [wallet?.address, setIsModalOpen, setModalState]);
};
