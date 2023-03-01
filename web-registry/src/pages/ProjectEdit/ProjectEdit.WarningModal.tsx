import { Box } from '@mui/material';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import { CancelButtonFooter } from 'web-components/lib/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/lib/components/typography';

import { ReactComponent as SadBee } from '../../assets/svgs/sad-bee.svg';

interface Props extends RegenModalProps {
  navigate: () => void;
}

export const WarningModal = ({ open, onClose, navigate }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box display="flex" justifyContent="center">
        <SadBee />
      </Box>
      <Title variant="h4" align="center" sx={{ my: 5 }}>
        Are you sure you want to discard your changes?
      </Title>
      <Body size="lg" align="center" sx={{ mb: 12.5 }}>
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
