import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { REGEN_DENOM } from 'config/allowedBaseDenoms';
import { useAtom } from 'jotai';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import WalletModal from 'web-components/lib/components/modal/wallet-modal';
import { WalletModalState } from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import { useLedger } from 'ledger';
import { isWaitingForSigningAtom } from 'lib/atoms/tx.atoms';
import { getBalanceQuery } from 'lib/queries/react-query/cosmos/bank/getBalanceQuery/getBalanceQuery';

import { chainId } from '../../../lib/ledger';
import { useWallet } from '../../../lib/wallet/wallet';
import { useConnectToWallet } from './hooks/useConnectToWallet';
import { useNavigateToMobileUrl } from './hooks/useNavigateToMobileUrl';
import { useResetModalOnConnect } from './hooks/useResetModalOnConnect';
import { MobileSigningModal } from './WalletButton.SigningModal';
import { useWalletButtonStyles } from './WalletButton.styles';
import { getMobileConnectUrl, getWalletsUiConfig } from './WalletButton.utils';

import Keplr from 'assets/keplr.png';

const WalletButton: React.FC = () => {
  const styles = useWalletButtonStyles();
  const { wallet, connect, loaded, error, walletConnectUri } = useWallet();
  const { bankClient } = useLedger();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitingForSigning, setIsWaitingForSigningAtom] = useAtom(
    isWaitingForSigningAtom,
  );
  const [modalState, setModalState] =
    useState<WalletModalState>('wallet-select');
  const isConnected = loaded ? !!wallet?.address : null;

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
    setModalState('wallet-select');
  }, [setIsModalOpen, setModalState]);

  const connectToWallet = useConnectToWallet({
    onModalClose,
    setModalState,
    connect,
  });

  const walletsUiConfig = useMemo(
    () => getWalletsUiConfig({ connectToWallet }),
    [connectToWallet],
  );
  const mobileConnectUrl = useMemo(
    () => getMobileConnectUrl({ uri: walletConnectUri }),
    [walletConnectUri],
  );

  useNavigateToMobileUrl({
    mobileConnectUrl,
    isWaitingForSigning,
    isConnected,
  });
  useResetModalOnConnect({ setIsModalOpen, setModalState, wallet });

  return chainId ? (
    <>
      <div className={styles.root}>
        <>
          {!wallet?.address && loaded && (
            <OutlinedButton onClick={onButtonClick} size="small">
              <img className={styles.icon} src={Keplr} alt="keplr" />
              connect wallet
            </OutlinedButton>
          )}
          {error && (
            <ErrorBanner text="Please install Keplr extension to use Regen Ledger features" />
          )}
        </>
      </div>
      <WalletModal
        open={isModalOpen}
        onClose={onModalClose}
        wallets={walletsUiConfig}
        state={modalState}
        qrCodeUri={walletConnectUri}
        mobileConnectUrl={mobileConnectUrl}
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

export { WalletButton };
