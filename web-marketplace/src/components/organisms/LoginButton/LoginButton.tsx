import { useCallback, useEffect, useMemo, useState } from 'react';
import { State, WalletStatus } from '@cosmos-kit/core';
import { useManager } from '@cosmos-kit/react-lite';
import { useQuery } from '@tanstack/react-query';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { useAtom, useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

import { useLedger } from 'ledger';
import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { isWaitingForSigningAtom } from 'lib/atoms/tx.atoms';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { useAuthData } from 'hooks/useAuthData';

import { chainId } from '../../../lib/ledger';
import { useWallet } from '../../../lib/wallet/wallet';
import { LoginModal } from '../LoginModal/LoginModal';
import { LoginModalState } from '../LoginModal/LoginModal.types';
import { useConnectToWallet } from './hooks/useConnectToWallet';
import { useNavigateToMobileUrl } from './hooks/useNavigateToMobileUrl';
import { useResetModalOnConnect } from './hooks/useResetModalOnConnect';
import { socialProviders } from './LoginButton.constants';
import { MobileSigningModal } from './LoginButton.SigningModal';
import { useLoginButtonStyles } from './LoginButton.styles';
import { ButtonSize } from './LoginButton.types';
import { getMobileConnectUrl, getWalletsUiConfig } from './LoginButton.utils';

type Props = {
  size?: ButtonSize;
};

const LoginButton = ({ size = 'small' }: Props) => {
  const styles = useLoginButtonStyles();
  const { noAccountAndNoWallet } = useAuthData();
  const {
    wallet,
    connect,
    loaded: walletLoaded,
    walletConnectUri,
    isConnected,
  } = useWallet();

  const { walletRepos } = useManager();
  const [qrState, setQRState] = useState<State>(State.Init); // state of QRCode

  const current = walletRepos[0]?.current;
  (current?.client as any)?.setActions?.({
    qrUrl: {
      state: setQRState,
    },
  });

  const walletStatus = current?.walletStatus;
  const message = current?.message;
  const qrUrl = current?.qrUrl;

  const { bankClient } = useLedger();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitingForSigning, setIsWaitingForSigningAtom] = useAtom(
    isWaitingForSigningAtom,
  );
  const [modalState, setModalState] = useState<LoginModalState>('select');
  const [connecting, setConnecting] = useState<boolean>(false);
  const [qrCodeUri, setQrCodeUri] = useState<string | undefined>();
  const isConnectedLoaded = walletLoaded ? isConnected : null;

  useEffect(() => {
    if (isModalOpen) {
      setConnecting(
        walletStatus === WalletStatus.Connecting && qrState === State.Init,
      );
      setQrCodeUri(qrUrl?.data);
    }
  }, [isModalOpen, qrState, walletStatus, qrUrl?.data, message]);

  // Populate cache with user balance once connected
  useQuery(
    getBalanceQuery({
      request: { address: wallet?.address, denom: REGEN_DENOM },
      client: bankClient,
      enabled: !!bankClient && !!wallet?.address,
    }),
  );

  const onButtonClick = useCallback(
    (): void => setIsModalOpen(true),
    [setIsModalOpen],
  );

  const onModalClose = useCallback((): void => {
    setIsModalOpen(false);
    setModalState('select');
  }, [setIsModalOpen, setModalState]);

  const connectToWallet = useConnectToWallet({
    onModalClose,
    setModalState,
    connect,
    connectWalletConnect: walletRepos[0]?.connect, // only one walletRepos for regen
  });

  const walletsUiConfig = useMemo(
    () =>
      getWalletsUiConfig({
        connectToWallet,
      }),
    [connectToWallet],
  );
  const mobileConnectUrl = useMemo(
    () => getMobileConnectUrl({ uri: walletConnectUri }),
    [walletConnectUri],
  );

  useNavigateToMobileUrl({
    mobileConnectUrl,
    isWaitingForSigning,
    isConnected: isConnectedLoaded,
  });
  useResetModalOnConnect({ setIsModalOpen, setModalState, wallet });

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
              await postData({
                url: `${apiUri}/marketplace/v1/auth/passcode`,
                data: {
                  email,
                },
                token,
              });
            } catch (e) {
              setErrorBannerTextAtom(String(e));
            }
          }
        }}
        state={modalState}
        qrCodeUri={qrCodeUri}
        connecting={connecting}
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
