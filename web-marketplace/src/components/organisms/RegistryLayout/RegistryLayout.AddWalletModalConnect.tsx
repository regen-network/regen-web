import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import { AddWalletModalConnect } from 'web-components/src/components/modal/add-wallet-modal/AddWalletModalConnect';

import { addWalletModalConnectAtom } from 'lib/atoms/modals.atoms';

import {
  ADD_WALLET_MODAL_CONNECT_SUBTITLE,
  ADD_WALLET_MODAL_CONNECT_TITLE,
} from './RegistryLayout.constants';

export const RegistryLayoutAddWalletModalConnect = (): JSX.Element => {
  const { _ } = useLingui();
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
      title={_(ADD_WALLET_MODAL_CONNECT_TITLE)}
      subtitle={_(ADD_WALLET_MODAL_CONNECT_SUBTITLE)}
    />
  );
};
