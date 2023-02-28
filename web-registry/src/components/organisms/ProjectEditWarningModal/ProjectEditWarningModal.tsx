import { Box } from '@mui/material';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import { Body, Title } from 'web-components/lib/components/typography';

interface Props extends RegenModalProps {}

export const ProjectEditWarningModal = ({ open, onClose }: RegenModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Title variant="h4" align="center" sx={{ mb: 5 }}>
        Are you sure you want to discard your changes?
      </Title>
      <Body size="lg">
        If you proceed, you will lose all the changes you made. This cannot be
        undone.
      </Body>
    </Modal>
  );
};
