import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Body, Title } from 'web-components/src/components/typography';

import { TITLE } from './AccountSwitchModal.constants';

export interface AccountSwitchModalProps extends RegenModalProps {
  prevAddr?: string;
}
export const AccountSwitchModal = ({
  onClose,
  open,
  prevAddr,
}: AccountSwitchModalProps) => {
  const { _ } = useLingui();

  return (
    <Modal open={open} onClose={onClose}>
      <Title className="text-center pb-20" variant="h4">
        {_(TITLE)}
      </Title>
      <Body className="text-center">
        <Trans>
          You switched accounts in Keplr, so your account on Regen Marketplace
          will also be changed.
          <br />
          <br />
          Please <b>approve in the Keplr popup</b> in order to proceed, or
          switch back to your original signed in account in Keplr:
          <br />
          {prevAddr}
        </Trans>
      </Body>
    </Modal>
  );
};
