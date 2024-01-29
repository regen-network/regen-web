import { useQuery } from '@tanstack/react-query';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';

import { useLedger } from 'ledger';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';

import { useAuthData } from 'hooks/useAuthData';

import { chainId } from '../../../lib/ledger';
import { useWallet } from '../../../lib/wallet/wallet';
import { LoginFlow } from '../LoginFlow/LoginFlow';
import { useLoginData } from './hooks/useLoginData';
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
        <LoginFlow
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
          wallets={walletsUiConfig} // TODO: remove if mobile + remove WC in all cases
          modalState={modalState}
          qrCodeUri={qrCodeUri}
          connecting={connecting}
        />
      </div>
    </>
  ) : (
    <></>
  );
};

export { LoginButton };
