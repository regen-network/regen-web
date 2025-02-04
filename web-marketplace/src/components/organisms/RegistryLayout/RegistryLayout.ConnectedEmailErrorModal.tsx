import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import { RegenModalProps } from 'web-components/src/components/modal';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { Body, Title } from 'web-components/src/components/typography';

import { connectedEmailErrorModalAtom } from 'lib/atoms/modals.atoms';

import {
  CONNECTED_EMAIL_ERROR_DESCRIPTION_END,
  CONNECTED_EMAIL_ERROR_DESCRIPTION_START,
  CONNECTED_EMAIL_ERROR_TITLE,
} from './RegistryLayout.constants';

export interface ConnectedEmailErrorModalProps extends RegenModalProps {
  email: string;
}

export const RegistryLayoutConnectedEmailErrorModal = () => {
  const { _ } = useLingui();
  const [connectedEmailErrorModal, setConnectedEmailErrorModalAtom] = useAtom(
    connectedEmailErrorModalAtom,
  );
  const { open, onClose, email } = connectedEmailErrorModal;

  const onCloseModal = useCallback(() => {
    setConnectedEmailErrorModalAtom(atom => void (atom.open = false));
    if (onClose) onClose();
  }, [setConnectedEmailErrorModalAtom, onClose]);

  return (
    <SadBeeModal open={open ?? false} onClose={onCloseModal}>
      <Title variant="h4" align="center" sx={{ my: 5 }}>
        {_(CONNECTED_EMAIL_ERROR_TITLE)}
      </Title>
      <Body size="lg" align="center" sx={{ mb: 12.5 }}>
        {_(CONNECTED_EMAIL_ERROR_DESCRIPTION_START)} <b>{email}</b>
        {_(CONNECTED_EMAIL_ERROR_DESCRIPTION_END)}
      </Body>
    </SadBeeModal>
  );
};
