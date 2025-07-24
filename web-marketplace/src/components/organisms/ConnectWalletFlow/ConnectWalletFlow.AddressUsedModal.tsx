import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import Image from 'next/image';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Title } from 'web-components/src/components/typography';

import sadBee from '../../../../public/svg/sad-bee.svg';
import { ADDRESS_USED_WITH_EMAIL_ERROR } from './ConnectWalletFlow.constants';

interface Props extends RegenModalProps {}

export const AddressUsedWithEmailModal = ({ open, onClose }: Props) => {
  const { _ } = useLingui();

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-center">
        <Image src={sadBee} alt={_(msg`sad bee`)} />
      </div>
      <Title variant="h4" align="center" sx={{ my: 5 }}>
        {_(ADDRESS_USED_WITH_EMAIL_ERROR)}
      </Title>
    </Modal>
  );
};
