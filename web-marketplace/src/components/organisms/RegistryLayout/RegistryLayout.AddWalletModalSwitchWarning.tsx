import { useAtom } from 'jotai';

import { AddWalletModalSwitchWarning } from 'web-components/src/components/modal/add-wallet-modal/AddWalletModalSwitchWarning';

import { addWalletModalSwitchWarningAtom } from 'lib/atoms/modals.atoms';

export const RegistryLayoutAddWalletModalSwitchWarning = (): JSX.Element => {
  const [{ open }, setAddWalletModalSwitchWarningAtom] = useAtom(
    addWalletModalSwitchWarningAtom,
  );
  const onClose = (): void =>
    setAddWalletModalSwitchWarningAtom(atom => void (atom.open = false));

  return <AddWalletModalSwitchWarning open={!!open} onClose={onClose} />;
};
