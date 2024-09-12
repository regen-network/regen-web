import { SadBeeIcon } from '../../../components/icons/SadBeeIcon';
import { Body, Subtitle, Title } from '../../typography';
import Modal, { RegenModalProps } from '..';

export interface KeplrWalletConnectModalProps extends RegenModalProps {
  address: string;
  title: string;
  bodyText: string;
}

const SwitchWalletWarningModal = ({
  open,
  address,
  title,
  bodyText,
  onClose,
}: KeplrWalletConnectModalProps) => {
  return (
    <Modal open={open} onClose={onClose} isFullscreenMobile={false}>
      <div className="max-w-[460px] flex flex-col items-center">
        <SadBeeIcon className="mb-20" />
        <Title align="center" variant="h4" mb={5}>
          {title}
        </Title>
        <Subtitle size="lg" className="mb-20">
          {address}
        </Subtitle>
        <Body size="lg" align="center">
          {bodyText}
        </Body>
      </div>
    </Modal>
  );
};

export { SwitchWalletWarningModal };
