import { useAtom } from 'jotai';

import { accountSwitchModalAtom } from 'lib/atoms/modals.atoms';

import { AccountSwitchModal } from '../AccountSwitchModal/AccountSwitchModal';

export const RegistryLayoutAccountSwitchModal = (): JSX.Element => {
  const [{ open, prevAddr }, setAccountSwitchModalAtom] = useAtom(
    accountSwitchModalAtom,
  );
  const onClose = (): void =>
    setAccountSwitchModalAtom(atom => void (atom.open = false));

  return (
    <AccountSwitchModal open={!!open} onClose={onClose} prevAddr={prevAddr} />
  );
};
