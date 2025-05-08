import { useCallback } from 'react';
import { Trans, useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { RegenModalProps } from 'web-components/src/components/modal';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { Body, Title } from 'web-components/src/components/typography';

import { connectedEmailErrorModalAtom } from 'lib/atoms/modals.atoms';

import {
  CONNECTED_EMAIL_ERROR_DESCRIPTION_END,
  CONNECTED_EMAIL_ERROR_DESCRIPTION_START,
  CONNECTED_EMAIL_ERROR_NOTE,
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
      <Title variant="h4" className="my-20 mx-15 text-center">
        {_(CONNECTED_EMAIL_ERROR_TITLE)}
      </Title>
      <Body size="lg" className="mb-15 text-center">
        {_(CONNECTED_EMAIL_ERROR_DESCRIPTION_START)} <b>{email}</b>
        {_(CONNECTED_EMAIL_ERROR_DESCRIPTION_END)}
      </Body>
      <Body size="lg" className="text-base text-center mb-20 italic">
        {_(CONNECTED_EMAIL_ERROR_NOTE)}
      </Body>
      <div className="flex justify-center mt-[45px]">
        <OutlinedButton
          href="https://guides.regen.network/guides/regen-marketplace-buyers-guides/logging-in-buyers"
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          className="hover:border-grey-0 hover:border-2 border-solid"
        >
          <Trans>Learn More</Trans>
        </OutlinedButton>
      </div>
    </SadBeeModal>
  );
};
