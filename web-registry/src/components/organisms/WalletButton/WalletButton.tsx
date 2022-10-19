import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import WalletModal from 'web-components/lib/components/modal/wallet-modal';
import { WalletModalState } from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';

import { ConnectParams } from 'lib/wallet/wallet.types';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

import Keplr from '../../../assets/keplr.png';
import { chainId } from '../../../lib/ledger';
import { useWallet } from '../../../lib/wallet/wallet';
import { useWalletButtonStyles } from './WalletButton.styles';
import { getMobileConnectUrl, getWalletsUiConfig } from './WalletButton.utils';

const WalletButton: React.FC = () => {
  const styles = useWalletButtonStyles();
  const { wallet, connect, loaded, error, walletConnectUri } = useWallet();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] =
    useState<WalletModalState>('wallet-select');

  const onButtonClick = (): void => setIsModalOpen(true);
  const onModalClose = (): void => {
    setIsModalOpen(false);
    setModalState('wallet-select');
  };
  const connectToWallet = useCallback(
    async ({ walletType }: ConnectParams): Promise<void> => {
      if (connect) {
        await connect({ walletType });
        if (walletType === WalletType.Keplr) {
          onModalClose();
        }
        if (walletType === WalletType.WalletConnectKeplr) {
          setModalState('wallet-mobile');
        }
      }
    },
    [connect],
  );

  const walletsUiConfig = useMemo(
    () => getWalletsUiConfig({ connectToWallet }),
    [connectToWallet],
  );
  const mobileConnectUrl = useMemo(
    () => getMobileConnectUrl({ uri: walletConnectUri }),
    [walletConnectUri],
  );

  useEffect(() => {
    if (mobileConnectUrl) {
      window.location.href = mobileConnectUrl;
    }
  }, [mobileConnectUrl]);

  useEffect(() => {
    if (wallet?.address) {
      setModalState('wallet-select');
      setIsModalOpen(false);
    }
  }, [wallet?.address]);

  return chainId ? (
    <>
      <div className={styles.root}>
        {!wallet?.address && loaded && (
          <OutlinedButton
            onClick={onButtonClick}
            sx={{ xs: { height: 30 }, md: { height: 40 } }}
          >
            <img className={styles.icon} src={Keplr} alt="keplr" />
            connect wallet
          </OutlinedButton>
        )}
        {error && (
          <ErrorBanner text="Please install Keplr extension to use Regen Ledger features" />
        )}
      </div>
      <WalletModal
        open={isModalOpen}
        onClose={onModalClose}
        wallets={walletsUiConfig}
        state={modalState}
        uri={walletConnectUri}
        mobileConnectUrl={mobileConnectUrl}
      />
    </>
  ) : (
    <></>
  );
};

export { WalletButton };
