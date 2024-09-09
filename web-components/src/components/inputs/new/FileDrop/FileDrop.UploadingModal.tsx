import { Loading } from '../../../loading';
import Modal, { RegenModalProps } from '../../../modal';
import { Body, Title } from '../../../typography';

type Props = RegenModalProps & {
  fileUploadingTitle: string;
  fileUplaodingDescription: string;
};

export const UploadingModal = ({
  fileUplaodingDescription,
  fileUploadingTitle,
  open,
  onClose,
}: Props) => (
  <Modal
    onClose={onClose}
    open={open}
    className="text-center"
    isFullscreenMobile={false}
  >
    <Loading className="min-h-[auto]" />
    <Title className="pt-30 pb-20" variant="h3">
      {fileUploadingTitle}
    </Title>
    <Body size="lg">{fileUplaodingDescription}</Body>
  </Modal>
);
