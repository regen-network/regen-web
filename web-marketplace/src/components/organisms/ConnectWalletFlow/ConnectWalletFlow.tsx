import { useState } from 'react';

import { AddressUsedWithEmailModal } from 'components/organisms/ConnectWalletFlow/ConnectWalletFlow.AddressUsedModal';
import { AddressUsedModal } from 'components/organisms/ConnectWalletFlow/ConnectWalletFlow.AddressUsedWithEmailModal';
import { useConnectWalletToAccount } from 'components/organisms/ConnectWalletFlow/hooks/useConnectWalletToAccount';

type ConnectWalletFlowProps = {
  onConnectModalClose: () => void;
  isConnectModalOpened: boolean;
  setError: (e: unknown) => void;
};
export const ConnectWalletFlow = ({
  isConnectModalOpened,
  onConnectModalClose,
  setError,
}: ConnectWalletFlowProps) => {
  const [addressUsedModalOpen, setAddressUsedModalOpen] = useState(false);
  const [addressUsedWithEmailModalOpen, setAddressUsedWithEmailModalOpen] =
    useState(false);

  useConnectWalletToAccount({
    isConnectModalOpened,
    onConnectModalClose,
    setError,
    setAddressUsedModalOpen,
    setAddressUsedWithEmailModalOpen,
  });

  return (
    <>
      <AddressUsedWithEmailModal
        open={addressUsedWithEmailModalOpen}
        onClose={() => setAddressUsedWithEmailModalOpen(false)}
      />
      <AddressUsedModal
        open={addressUsedModalOpen}
        onClose={() => setAddressUsedModalOpen(false)}
        merge={() => {}}
      />
    </>
  );
};
