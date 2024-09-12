import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import { AddWalletModalRemove } from 'web-components/src/components/modal/add-wallet-modal/AddWalletModalRemove';

import { addWalletModalRemoveAtom } from 'lib/atoms/modals.atoms';

import {
  ADD_WALLET_MODAL_REMOVE_BUTTON_LABEL,
  ADD_WALLET_MODAL_REMOVE_SUBTITLE,
  ADD_WALLET_MODAL_REMOVE_TITLE,
} from './RegistryLayout.constants';

export const RegistryLayoutAddWalletModalRemove = (): JSX.Element => {
  const { _ } = useLingui();
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
      title={_(ADD_WALLET_MODAL_REMOVE_TITLE)}
      subtitle={_(ADD_WALLET_MODAL_REMOVE_SUBTITLE)}
      buttonLabel={_(ADD_WALLET_MODAL_REMOVE_BUTTON_LABEL)}
    />
  );
};
