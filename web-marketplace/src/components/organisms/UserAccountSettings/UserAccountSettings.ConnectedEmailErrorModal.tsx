import { RegenModalProps } from 'web-components/src/components/modal';
import { SadBeeModal } from 'web-components/src/components/modal/SadBeeModal/SadBeeModal';
import { Body, Title } from 'web-components/src/components/typography';

import {
  CONNECTED_EMAIL_ERROR_DESCRIPTION_END,
  CONNECTED_EMAIL_ERROR_DESCRIPTION_START,
  CONNECTED_EMAIL_ERROR_TITLE,
} from './UserAccountSettings.constants';

interface Props extends RegenModalProps {
  email: string;
}

export const ConnectedEmailErrorModal = ({ open, onClose, email }: Props) => {
  return (
    <SadBeeModal open={open} onClose={onClose}>
      <Title variant="h4" align="center" sx={{ my: 5 }}>
        {CONNECTED_EMAIL_ERROR_TITLE}
      </Title>
      <Body size="lg" align="center" sx={{ mb: 12.5 }}>
        {CONNECTED_EMAIL_ERROR_DESCRIPTION_START}
        <b>{email}</b>
        {CONNECTED_EMAIL_ERROR_DESCRIPTION_END}
      </Body>
    </SadBeeModal>
  );
};
