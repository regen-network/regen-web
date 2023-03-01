import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import { CancelButtonFooter } from 'web-components/lib/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/lib/components/typography';

import { ReactComponent as SadBee } from '../../../assets/svgs/sad-bee.svg';

interface Props extends RegenModalProps {
  navigate: () => void;
}

export const ProjectEditWarningModal = ({ open, onClose, navigate }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <SadBee />
      <Title variant="h4" align="center" sx={{ mb: 5 }}>
        Are you sure you want to discard your changes?
      </Title>
      <Body size="lg">
        If you proceed, you will lose all the changes you made. This cannot be
        undone.
      </Body>
      <CancelButtonFooter
        label="yes, delete"
        onCancel={onClose}
        onClick={() => {
          navigate();
          onClose();
        }}
      />
    </Modal>
  );
};
