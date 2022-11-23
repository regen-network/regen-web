import React, { useCallback, useMemo, useState } from 'react';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import WalletModal from 'web-components/lib/components/modal/wallet-modal';
import { WalletModalState } from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import { useGlobalStore } from 'lib/context/globalContext';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitingForSigning, setGlobalStore] = useGlobalStore(
    store => store['isWaitingForSigning'],
  );
  const [modalState, setModalState] =
    useState<WalletModalState>('wallet-select');
  const isConnected = loaded ? !!wallet?.address : null;

  const onButtonClick = useCallback(
    (): void => setIsModalOpen(true),
    [setIsModalOpen],
  );
  const onModalClose = useCallback((): void => {
    setIsModalOpen(false);
    setModalState('wallet-select');
  }, [setIsModalOpen, setModalState]);

  const connectToWallet = useConnectToWallet({
    address: wallet?.address,
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
        onClose={() => setGlobalStore({ isWaitingForSigning: false })}
      />
    </>
  ) : (
    <></>
  );
};

export { WalletButton };
