import Modal, { RegenModalProps } from 'web-components/src/components/modal';
import { Title } from 'web-components/src/components/typography';

import { ADDRESS_USED_WITH_EMAIL_ERROR } from './ConnectWalletFlow.constants';

interface Props extends RegenModalProps {}

export const AddressUsedWithEmailModal = ({ open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-center">
        <img src="/svg/sad-bee.svg" alt="sad bee" />
      </div>
      <Title variant="h4" align="center" sx={{ my: 5 }}>
        {ADDRESS_USED_WITH_EMAIL_ERROR}
      </Title>
    </Modal>
  );
};
