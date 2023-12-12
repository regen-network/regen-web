import { useAtom } from 'jotai';

import { AddWalletModalConnect } from 'web-components/src/components/modal/add-wallet-modal/AddWalletModalConnect';

import { addWalletModalConnectAtom } from 'lib/atoms/modals.atoms';

export const RegistryLayoutAddWalletModalConnect = (): JSX.Element => {
  const [{ open, partyInfo }, setAddWalletModalConnectAtom] = useAtom(
    addWalletModalConnectAtom,
  );
  const onClose = (): void =>
    setAddWalletModalConnectAtom(atom => void (atom.open = false));

  return (
    <AddWalletModalConnect
      open={!!open}
      onClose={onClose}
      partyInfo={partyInfo}
    />
  );
};
