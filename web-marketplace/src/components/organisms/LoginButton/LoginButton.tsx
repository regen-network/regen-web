import { useQuery } from '@tanstack/react-query';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { EmailConfirmationModal } from 'web-components/lib/components/modal/EmailConfirmationModal/EmailConfirmationModal';

import { useLedger } from 'ledger';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';

import { useAuthData } from 'hooks/useAuthData';

import { chainId } from '../../../lib/ledger';
import { useWallet } from '../../../lib/wallet/wallet';
import { useEmailConfirmationData } from '../LoginFlow/hooks/useEmailConfirmationData';
import { LoginFlow } from '../LoginFlow/LoginFlow';
import { LoginModal } from '../LoginModal/LoginModal';
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
  const { wallet } = useWallet();
  const {
    connecting,
    isModalOpen,
    modalState,
    onModalClose,
    qrCodeUri,
    isWaitingForSigning,
    setIsWaitingForSigningAtom,
    walletsUiConfig,
    onButtonClick,
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
        <LoginFlow />
      </div>
    </>
  ) : (
    <></>
  );
};

export { LoginButton };
