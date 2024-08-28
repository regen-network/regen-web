import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/src/components/typography';

import {
  ADDRESS_USED_CANCEL,
  ADDRESS_USED_DESCRIPTION,
  ADDRESS_USED_NEXT,
  ADDRESS_USED_TITLE,
} from './ConnectWalletFlow.constants';

interface Props extends RegenModalProps {
  next: () => void;
}

export const AddressUsedModal = ({ open, onClose, next }: Props) => {
  const { _ } = useLingui();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-center">
        <img src="/svg/sad-bee.svg" alt={_(msg`sad bee`)} />
      </div>
      <Title variant="h4" align="center" sx={{ my: 5 }}>
        {_(ADDRESS_USED_TITLE)}
      </Title>
      <Body size="lg" align="center" sx={{ mb: 12.5 }}>
        {_(ADDRESS_USED_DESCRIPTION)}
      </Body>
      <CancelButtonFooter
        onCancel={onClose}
        cancelLabel={_(ADDRESS_USED_CANCEL)}
        label={_(ADDRESS_USED_NEXT)}
        onClick={next}
      />
    </Modal>
  );
};
