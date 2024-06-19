import { Loading } from '../../../loading';
import Modal, { RegenModalProps } from '../../../modal';
import { Body, Title } from '../../../typography';
import {
  FILE_UPLOADING_DESCRIPTION,
  FILE_UPLOADING_TITLE,
} from './FileDrop.constants';

type Props = RegenModalProps;

export const UploadingModal = ({ open, onClose }: Props) => (
  <Modal
    onClose={onClose}
    open={open}
    className="text-center"
    isFullscreenMobile={false}
  >
    <Loading className="min-h-[auto]" />
    <Title className="pt-30 pb-20" variant="h3">
      {FILE_UPLOADING_TITLE}
    </Title>
    <Body size="lg">{FILE_UPLOADING_DESCRIPTION}</Body>
  </Modal>
);
