import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Title } from 'web-components/src/components/typography';

import { ADDRESS_USED_WITH_EMAIL_ERROR } from './ConnectWalletFlow.constants';

interface Props extends RegenModalProps {}

export const AddressUsedWithEmailModal = ({ open, onClose }: Props) => {
  const { _ } = useLingui();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-center">
        <img src="/svg/sad-bee.svg" alt={_(msg`sad bee`)} />
      </div>
      <Title variant="h4" align="center" sx={{ my: 5 }}>
        {_(ADDRESS_USED_WITH_EMAIL_ERROR)}
      </Title>
    </Modal>
  );
};
