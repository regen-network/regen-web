import { RegenModalProps } from 'web-components/src/components/modal';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/src/components/typography';

interface Props extends RegenModalProps {
  navigate: () => void;
}

export const SaveChangesWarningModal = ({ open, onClose, navigate }: Props) => {
  return (
    <SadBeeModal open={open} onClose={onClose}>
      <Title variant="h4" align="center" sx={{ my: 5 }}>
        Are you sure you want to discard your changes?
      </Title>
      <Body size="lg" align="center" sx={{ mb: 12.5 }}>
        If you proceed, you will lose all unsaved changes you made. This cannot
        be undone.
      </Body>
      <CancelButtonFooter
        label="yes, discard"
        onCancel={onClose}
        onClick={() => {
          navigate();
          onClose();
        }}
      />
    </SadBeeModal>
  );
};
