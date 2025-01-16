import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { cn } from 'web-components/src/utils/styles/cn';

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
  onlyWallets?: boolean;
  containedButton?: boolean;
  onClick?: () => void;
  buttonLabel?: string;
  className?: string;
  buttonClassName?: string;
};

const LoginButton = ({
  size = 'small',
  onlyWallets,
  containedButton,
  onClick,
  buttonLabel,
  className,
  buttonClassName,
}: Props) => {
  const { _ } = useLingui();

  const styles = useLoginButtonStyles();
  const { wallet } = useWallet();
  const {
    isModalOpen,
    modalState,
    onModalClose,
    walletsUiConfig,
    onButtonClick,
  } = useLoginData({});
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

  const Button = containedButton ? ContainedButton : OutlinedButton;

  return chainId ? (
    <>
      <div className={cn(styles.root, className)}>
        <>
          {noAccountAndNoWallet && (
            <Button
              onClick={() => {
                onClick && onClick();
                onButtonClick();
              }}
              size={size}
              className={buttonClassName}
            >
              {buttonLabel ? buttonLabel : _(msg`log in`)}
            </Button>
          )}
        </>
        <LoginFlow
          isModalOpen={isModalOpen}
          onModalClose={onModalClose}
          wallets={walletsUiConfig}
          modalState={modalState}
          onlyWallets={onlyWallets}
        />
      </div>
    </>
  ) : (
    <></>
  );
};

export { LoginButton };
