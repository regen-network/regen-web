import { useAtom } from 'jotai';

import { AddWalletModalRemove } from 'web-components/src/components/modal/add-wallet-modal/AddWalletModalRemove';

import { addWalletModalRemoveAtom } from 'lib/atoms/modals.atoms';

export const RegistryLayoutAddWalletModalRemove = (): JSX.Element => {
  const [{ open, partyInfo, onClick }, setAddWalletModalRemoveAtom] = useAtom(
    addWalletModalRemoveAtom,
  );
  const onClose = (): void =>
    setAddWalletModalRemoveAtom(atom => void (atom.open = false));

  return (
    <AddWalletModalRemove
      open={!!open}
      onClose={onClose}
      partyInfo={partyInfo}
      onCancel={onClose}
      onClick={onClick}
    />
  );
};
