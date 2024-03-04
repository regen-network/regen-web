import { useAtom } from 'jotai';

import { EmailConfirmationModal } from 'web-components/src/components/modal/EmailConfirmationModal/EmailConfirmationModal';

import { isWaitingForSigningAtom } from 'lib/atoms/tx.atoms';

import {
  EMAIL_CONFIRMATION_CANCEL,
  EMAIL_CONFIRMATION_SUBMIT,
  socialProviders,
} from '../LoginButton/LoginButton.constants';
import { MobileSigningModal } from '../LoginButton/LoginButton.SigningModal';
import { getResendCodeButtonLink } from '../LoginButton/utils/getResendCodeButtonLink';
import { getResendCodeLabel } from '../LoginButton/utils/getResendCodeLabel';
import { LoginModal } from '../LoginModal/LoginModal';
import { LoginModalState, LoginProvider } from '../LoginModal/LoginModal.types';
import { useEmailConfirmationData } from './hooks/useEmailConfirmationData';
import { useWallet } from 'lib/wallet/wallet';

type Props = {
  isModalOpen: boolean;
  onModalClose: () => void;
  wallets: LoginProvider[];
  modalState: LoginModalState;
  qrCodeUri?: string;
};

const LoginFlow = ({
  isModalOpen,
  onModalClose,
  wallets,
  modalState,
}: Props) => {
  const {
    isConfirmationModalOpen,
    email,
    emailModalError,
    resendTimeLeft,
    onConfirmationModalClose,
    onMailCodeChange,
    onResendPasscode,
    onEmailSubmit,
  } = useEmailConfirmationData({});
  const [isWaitingForSigning, setIsWaitingForSigningAtom] = useAtom(
    isWaitingForSigningAtom,
  );
  const { loginDisabled } = useWallet();

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
      />
      <EmailConfirmationModal
        resendText={getResendCodeLabel({ resendTimeLeft })}
        resendButtonLink={getResendCodeButtonLink({
          resendTimeLeft,
          onResendPasscode,
        })}
        cancelButton={{
          text: EMAIL_CONFIRMATION_CANCEL,
          onClick: onConfirmationModalClose,
        }}
        signInButton={{
          text: EMAIL_CONFIRMATION_SUBMIT,
          disabled: true,
          onClick: () => void 0,
        }}
        mailLink={{ text: email, href: '#' }}
        onClose={onConfirmationModalClose}
        open={isConfirmationModalOpen}
        error={emailModalError}
        onCodeChange={onMailCodeChange}
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
