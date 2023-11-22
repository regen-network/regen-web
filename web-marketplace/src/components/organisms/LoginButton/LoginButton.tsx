import { useQuery } from '@tanstack/react-query';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { EmailConfirmationModal } from 'web-components/lib/components/modal/EmailConfirmationModal/EmailConfirmationModal';

import { useLedger } from 'ledger';
import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { useAuthData } from 'hooks/useAuthData';

import { chainId } from '../../../lib/ledger';
import { useWallet } from '../../../lib/wallet/wallet';
import { LoginModal } from '../LoginModal/LoginModal';
import { useEmailConfirmationData } from './hooks/useEmailConfirmationData';
import { useLoginData } from './hooks/useLoginData';
import {
  EMAIL_CONFIRMATION_CANCEL,
  EMAIL_CONFIRMATION_SUBMIT,
  RESEND_BUTTON_TEXT,
  RESEND_TEXT,
  socialProviders,
} from './LoginButton.constants';
import { MobileSigningModal } from './LoginButton.SigningModal';
import { useLoginButtonStyles } from './LoginButton.styles';
import { ButtonSize } from './LoginButton.types';

type Props = {
  size?: ButtonSize;
};

const LoginButton = ({ size = 'small' }: Props) => {
  const styles = useLoginButtonStyles();
  const { wallet, walletConnectUri } = useWallet();
  const {
    isConfirmationModalOpen,
    email,
    emailModalError,
    onConfirmationModalClose,
    onMailCodeChange,
    onResendPasscode,
    setIsConfirmationModalOpen,
    setEmail,
  } = useEmailConfirmationData();

  const {
    connecting,
    isModalOpen,
    modalState,
    onButtonClick,
    onModalClose,
    qrCodeUri,
    isWaitingForSigning,
    setIsWaitingForSigningAtom,
    walletsUiConfig,
  } = useLoginData();

  const { noAccountAndNoWallet } = useAuthData();

  const { bankClient } = useLedger();

  // Populate cache with user balance once connected
  useQuery(
    getBalanceQuery({
      request: { address: wallet?.address, denom: REGEN_DENOM },
      client: bankClient,
      enabled: !!bankClient && !!wallet?.address,
    }),
  );

  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  return chainId ? (
    <>
      <div className={styles.root}>
        <>
          {noAccountAndNoWallet && (
            <OutlinedButton onClick={onButtonClick} size={size}>
              log in
            </OutlinedButton>
          )}
        </>
      </div>
      <LoginModal
        open={isModalOpen}
        onClose={onModalClose}
        wallets={walletsUiConfig}
        socialProviders={socialProviders}
        onEmailSubmit={async ({ email }) => {
          if (token) {
            try {
              setEmail(email);
              await postData({
                url: `${apiUri}/marketplace/v1/auth/passcode`,
                data: {
                  email,
                },
                token,
              });
              onModalClose();
              setIsConfirmationModalOpen(true);
            } catch (e) {
              setErrorBannerTextAtom(String(e));
            }
          }
        }}
        state={modalState}
        qrCodeUri={qrCodeUri}
        connecting={connecting}
      />
      <EmailConfirmationModal
        resendText={RESEND_TEXT}
        resendButtonLink={{
          text: RESEND_BUTTON_TEXT,
          onClick: onResendPasscode,
        }}
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
  ) : (
    <></>
  );
};

export { LoginButton };
