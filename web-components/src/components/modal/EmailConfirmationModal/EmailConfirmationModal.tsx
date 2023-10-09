import { Box } from '@mui/material';

import { Body, Title } from '../../typography';
import Modal, { RegenModalProps } from '..';
import {
  EMAIL_CONFIRMATION_DESCRIPTION1,
  EMAIL_CONFIRMATION_DESCRIPTION2,
  EMAIL_CONFIRMATION_DESCRIPTION3,
  EMAIL_CONFIRMATION_TITLE,
} from './EmailConfirmationModal.constants';

export interface EmailConfirmationModalProps extends RegenModalProps {
  mailLinkChildren: JSX.Element;
  resendLinkChildren: JSX.Element;
}

export const EmailConfirmationModal = ({
  open,
  mailLinkChildren,
  resendLinkChildren,
  onClose,
}: EmailConfirmationModalProps) => (
  <Modal open={open} onClose={onClose} isFullscreenMobile={false}>
    <Box
      sx={{
        maxWidth: 460,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Title align="center" variant="h4" mb={5}>
        {EMAIL_CONFIRMATION_TITLE}
      </Title>
      <Body size="lg" align="center" mb={5}>
        {EMAIL_CONFIRMATION_DESCRIPTION1} {mailLinkChildren}
        {'.'}
      </Body>
      <Body size="lg" align="center" mb={5}>
        {EMAIL_CONFIRMATION_DESCRIPTION2}
      </Body>
      <Body size="lg" align="center">
        {EMAIL_CONFIRMATION_DESCRIPTION3} {resendLinkChildren}
        {'.'}
      </Body>
    </Box>
  </Modal>
);
