import { ReactNode } from 'react';
import { Box } from '@mui/material';

import ContainedButton from 'src/components/buttons/ContainedButton';
import { TextButton } from 'src/components/buttons/TextButton';
import { ButtonType } from 'src/types/shared/buttonType';

import { Body, Title } from '../../typography';
import Modal, { RegenModalProps } from '..';
import {
  EMAIL_CONFIRMATION_CODE_HELPER,
  EMAIL_CONFIRMATION_DESCRIPTION,
  EMAIL_CONFIRMATION_TITLE,
} from './EmailConfirmationModal.constants';

export interface EmailConfirmationModalProps extends RegenModalProps {
  mailLinkChildren: JSX.Element;
  resendLinkChildren: JSX.Element;
  codeInputs?: ReactNode;
  resendTimer?: number;
  cancelButton: ButtonType;
  signInButton: ButtonType;
}

export const EmailConfirmationModal = ({
  open,
  mailLinkChildren,
  resendLinkChildren,
  codeInputs,
  resendTimer,
  cancelButton,
  signInButton,
  onClose,
}: EmailConfirmationModalProps) => {
  return (
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
          {EMAIL_CONFIRMATION_DESCRIPTION} {mailLinkChildren}
          {'.'}
        </Body>
        <Body size="lg" align="center" mb={5}>
          {EMAIL_CONFIRMATION_CODE_HELPER}
        </Body>
        <hr className="h-1 w-full bg-grey-300 mb-40 border-0" />
        {resendTimer && (
          <Body
            sx={{ mb: 13.5, width: '100%' }}
          >{`Resend after ${resendTimer} seconds`}</Body>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
          <TextButton
            className="mr-40"
            onClick={cancelButton.onClick}
            disabled={cancelButton.disabled}
          >
            {cancelButton.text}
          </TextButton>
          <ContainedButton
            onClick={signInButton.onClick}
            disabled={signInButton.disabled}
          >
            {signInButton.text}
          </ContainedButton>
        </Box>
      </Box>
    </Modal>
  );
};
