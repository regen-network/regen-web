import { SadBeeIcon } from '../../../components/icons/SadBeeIcon';
import { Body, Subtitle, Title } from '../../typography';
import Modal, { RegenModalProps } from '..';
import {
  SWITCH_WALLET_WARNING_MODAL_MESSAGE,
  SWITCH_WALLET_WARNING_MODAL_TITLE,
} from './SwitchWalletWarningModal.constants';

export interface KeplrWalletConnectModalProps extends RegenModalProps {
  address: string;
}

const SwitchWalletWarningModal = ({
  open,
  address,
  onClose,
}: KeplrWalletConnectModalProps) => {
  return (
    <Modal open={open} onClose={onClose} isFullscreenMobile={false}>
      <div className="max-w-[460px] flex flex-col items-center">
        <SadBeeIcon className="mb-20" />
        <Title align="center" variant="h4" mb={5}>
          {SWITCH_WALLET_WARNING_MODAL_TITLE}
        </Title>
        <Subtitle size="lg" className="mb-20">
          {address}
        </Subtitle>
        <Body size="lg" align="center">
          {SWITCH_WALLET_WARNING_MODAL_MESSAGE}
        </Body>
      </div>
    </Modal>
  );
};

export { SwitchWalletWarningModal };
