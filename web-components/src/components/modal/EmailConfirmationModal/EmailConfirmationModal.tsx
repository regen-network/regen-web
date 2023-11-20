import { ReactNode, useRef } from 'react';
import { Box, Link } from '@mui/material';

import ContainedButton from '../../../components/buttons/ContainedButton';
import { TextButton } from '../../../components/buttons/TextButton';
import { ConfirmationCode } from '../../../components/inputs/new/ConfirmationCode/ConfirmationCode';
import { ConfirmationCodeRef } from '../../../components/inputs/new/ConfirmationCode/ConfirmationCode.types';
import { ButtonType } from '../../../types/shared/buttonType';
import { LinkType } from '../../../types/shared/linkType';
import { Body, Title } from '../../typography';
import Modal, { RegenModalProps } from '..';
import {
  EMAIL_CONFIRMATION_CODE_HELPER,
  EMAIL_CONFIRMATION_DESCRIPTION,
  EMAIL_CONFIRMATION_TITLE,
} from './EmailConfirmationModal.constants';

export interface EmailConfirmationModalProps extends RegenModalProps {
  mailLink: LinkType;
  resendText?: string;
  error?: ReactNode;
  resendButtonLink?: ButtonType;
  cancelButton: ButtonType;
  signInButton: ButtonType;
  onCodeChange: (code: string) => void;
}

export const EmailConfirmationModal = ({
  open,
  mailLink,
  resendText,
  resendButtonLink,
  error,
  cancelButton,
  signInButton,
  onClose,
  onCodeChange,
}: EmailConfirmationModalProps) => {
  const codeInputRef = useRef<ConfirmationCodeRef>(null);

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
          {EMAIL_CONFIRMATION_DESCRIPTION}{' '}
          <Link href={mailLink.href}>{mailLink.text}</Link>
          {'.'}
        </Body>
        <Body size="lg" align="center" mb={5} sx={{ fontWeight: 700 }}>
          {EMAIL_CONFIRMATION_CODE_HELPER}
        </Body>
        <ConfirmationCode
          onChange={onCodeChange}
          ref={codeInputRef}
          className="mb-20"
        />
        {error && (
          <p className="text-error-400 font-bold text-center text-lg">
            {error}
          </p>
        )}
        <hr className="h-1 w-full bg-grey-300  mb-40 border-0 mt-50" />
        <div className="flex justify-start items-center w-full mb-50 text-lg">
          {resendText && (
            <p className="italic text-grey-500 mr-5">{resendText}</p>
          )}
          {resendButtonLink && (
            <div
              role="button"
              onClick={resendButtonLink.onClick}
              className="inline-block font-bold text-brand-400 whitespace-nowrap cursor-pointer"
            >
              {resendButtonLink.text}
            </div>
          )}
          {'.'}
        </div>
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
