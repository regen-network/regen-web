import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { EmailConfirmationModal } from 'web-components/lib/components/modal/EmailConfirmationModal/EmailConfirmationModal';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { isWaitingForSigningAtom } from 'lib/atoms/tx.atoms';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { useWallet } from 'lib/wallet/wallet';

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

type Props = {
  isModalOpen: boolean;
  onModalClose: () => void;
  wallets: LoginProvider[];
  modalState: LoginModalState;
  qrCodeUri?: string;
  connecting: boolean;
};

const LoginFlow = ({
  isModalOpen,
  onModalClose,
  wallets,
  modalState,
  qrCodeUri,
  connecting,
}: Props) => {
  const { walletConnectUri } = useWallet();
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
        qrCodeUri={qrCodeUri}
        connecting={connecting}
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
      <MobileSigningModal
        isOpen={isWaitingForSigning && !!walletConnectUri}
        onClose={() => setIsWaitingForSigningAtom(false)}
      />
    </>
  );
};

export { LoginFlow };
