import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import { AddWalletModalSwitch } from 'web-components/src/components/modal/add-wallet-modal/AddWalletModalSwitch';

import { addWalletModalSwitchAtom } from 'lib/atoms/modals.atoms';

import {
  ADD_WALLET_MODAL_SWITCH_SUBTITLE,
  ADD_WALLET_MODAL_SWITCH_TITLE,
} from './RegistryLayout.constants';

export const RegistryLayoutAddWalletModalSwitch = (): JSX.Element => {
  const { _ } = useLingui();
  const [{ open }, setAddWalletModalSwitchAtom] = useAtom(
    addWalletModalSwitchAtom,
  );
  const onClose = (): void =>
    setAddWalletModalSwitchAtom(atom => void (atom.open = false));

  return (
    <AddWalletModalSwitch
      open={!!open}
      onClose={onClose}
      title={_(ADD_WALLET_MODAL_SWITCH_TITLE)}
      subtitle={_(ADD_WALLET_MODAL_SWITCH_SUBTITLE)}
    />
  );
};
