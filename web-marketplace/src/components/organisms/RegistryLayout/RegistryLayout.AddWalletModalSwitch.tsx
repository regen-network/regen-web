import { useAtom } from 'jotai';

import { AddWalletModalSwitch } from 'web-components/src/components/modal/add-wallet-modal/AddWalletModalSwitch';

import { addWalletModalSwitchAtom } from 'lib/atoms/modals.atoms';

export const RegistryLayoutAddWalletModalSwitch = (): JSX.Element => {
  const [{ open }, setAddWalletModalSwitchAtom] = useAtom(
    addWalletModalSwitchAtom,
  );
  const onClose = (): void =>
    setAddWalletModalSwitchAtom(atom => void (atom.open = false));

  return <AddWalletModalSwitch open={!!open} onClose={onClose} />;
};
