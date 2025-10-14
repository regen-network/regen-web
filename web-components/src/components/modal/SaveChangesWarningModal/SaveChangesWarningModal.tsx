import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Body, Title } from 'web-components/src/components/typography';

import { RegenModalPropsWithOnClose } from '../../../types/shared/modalPropsWithOnClose';

interface Props extends RegenModalPropsWithOnClose {
  title: string;
  bodyText: string;
  buttonText: string;
  navigate: () => void;
}

export const SaveChangesWarningModal = ({
  open,
  title,
  bodyText,
  buttonText,
  onClose,
  navigate,
}: Props) => {
  return (
    <SadBeeModal open={open} onClose={onClose}>
      <Title variant="h4" align="center" sx={{ my: 5 }}>
        {title}
      </Title>
      <Body size="lg" align="center" sx={{ mb: 12.5 }}>
        {bodyText}
      </Body>
      <CancelButtonFooter
        label={buttonText}
        onCancel={onClose}
        onClick={() => {
          navigate();
          onClose();
        }}
      />
    </SadBeeModal>
  );
};
