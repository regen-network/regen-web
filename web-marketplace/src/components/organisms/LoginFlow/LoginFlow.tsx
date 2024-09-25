import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import { EmailConfirmationModal } from 'web-components/src/components/modal/EmailConfirmationModal/EmailConfirmationModal';

import { isWaitingForSigningAtom } from 'lib/atoms/tx.atoms';
import {
  EMAIL_CONFIRMATION_ARIA_LABEL,
  EMAIL_CONFIRMATION_CODE_HELPER,
  EMAIL_CONFIRMATION_DESCRIPTION,
  EMAIL_CONFIRMATION_TITLE,
} from 'lib/constants/shared.constants';
import { useWallet } from 'lib/wallet/wallet';

import { useSocialProviders } from '../LoginButton/hooks/useSocialProviders';
import {
  EMAIL_CONFIRMATION_CANCEL,
  EMAIL_CONFIRMATION_SUBMIT,
} from '../LoginButton/LoginButton.constants';
import { MobileSigningModal } from '../LoginButton/LoginButton.SigningModal';
import { getResendCodeButtonLink } from '../LoginButton/utils/getResendCodeButtonLink';
import { getResendCodeLabel } from '../LoginButton/utils/getResendCodeLabel';
import { LoginModal } from '../LoginModal/LoginModal';
import { LoginModalState, LoginProvider } from '../LoginModal/LoginModal.types';
import { useEmailConfirmationData } from './hooks/useEmailConfirmationData';

type Props = {
  isModalOpen: boolean;
  onModalClose: () => void;
  wallets: LoginProvider[];
  modalState: LoginModalState;
  qrCodeUri?: string;
  createProject?: boolean;
  isConnectingRef?: React.MutableRefObject<boolean>;
  onlyWallets?: boolean;
};

const LoginFlow = ({
  isModalOpen,
  onModalClose,
  wallets,
  modalState,
  createProject,
  isConnectingRef,
  onlyWallets,
}: Props) => {
  const { _ } = useLingui();
  const {
    isConfirmationModalOpen,
    email,
    emailModalError,
    resendTimeLeft,
    onConfirmationModalClose,
    onMailCodeChange,
    onResendPasscode,
    onEmailSubmit,
  } = useEmailConfirmationData({ isConnectingRef });
  const [isWaitingForSigning, setIsWaitingForSigningAtom] = useAtom(
    isWaitingForSigningAtom,
  );
  const { loginDisabled } = useWallet();
  const socialProviders = useSocialProviders(createProject);

  return (
    <>
      <LoginModal
        open={isModalOpen}
        onClose={onModalClose}
        wallets={wallets}
        socialProviders={socialProviders}
        onEmailSubmit={async ({ email }) => {
          await onEmailSubmit({ email, callback: onModalClose });
        }}
        state={modalState}
        onlyWallets={onlyWallets}
      />
      <EmailConfirmationModal
        ariaLabel={_(EMAIL_CONFIRMATION_ARIA_LABEL)}
        resendText={getResendCodeLabel({ resendTimeLeft, _ })}
        resendButtonLink={getResendCodeButtonLink({
          resendTimeLeft,
          onResendPasscode,
          _,
        })}
        cancelButton={{
          text: _(EMAIL_CONFIRMATION_CANCEL),
          onClick: onConfirmationModalClose,
        }}
        signInButton={{
          text: _(EMAIL_CONFIRMATION_SUBMIT),
          disabled: true,
          onClick: () => void 0,
        }}
        mailLink={{ text: email, href: '#' }}
        onClose={onConfirmationModalClose}
        open={isConfirmationModalOpen}
        error={emailModalError}
        onCodeChange={onMailCodeChange}
        title={_(EMAIL_CONFIRMATION_TITLE)}
        description={_(EMAIL_CONFIRMATION_DESCRIPTION)}
        helperText={_(EMAIL_CONFIRMATION_CODE_HELPER)}
      />
      {loginDisabled && (
        <MobileSigningModal
          isOpen={isWaitingForSigning}
          onClose={() => setIsWaitingForSigningAtom(false)}
        />
      )}
    </>
  );
};

export { LoginFlow };
