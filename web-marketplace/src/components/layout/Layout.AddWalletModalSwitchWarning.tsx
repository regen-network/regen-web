'use client';

import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import { AddWalletModalSwitchWarning } from 'web-components/src/components/modal/add-wallet-modal/AddWalletModalSwitchWarning';

import { addWalletModalSwitchWarningAtom } from 'lib/atoms/modals.atoms';

import { ADD_WALLET_MODAL_SWITCH_WARNING_TITLE } from '../organisms/RegistryLayout/RegistryLayout.constants';

export const LayoutAddWalletModalSwitchWarning = (): JSX.Element => {
  const { _ } = useLingui();
  const [{ open }, setAddWalletModalSwitchWarningAtom] = useAtom(
    addWalletModalSwitchWarningAtom,
  );
  const onClose = (): void =>
    setAddWalletModalSwitchWarningAtom(atom => void (atom.open = false));

  return (
    <AddWalletModalSwitchWarning
      open={!!open}
      onClose={onClose}
      title={_(ADD_WALLET_MODAL_SWITCH_WARNING_TITLE)}
    />
  );
};
