import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import WalletModal from 'web-components/lib/components/modal/wallet-modal';
import { WalletModalState } from 'web-components/lib/components/modal/wallet-modal/WalletModal.types';
import { Theme } from 'web-components/lib/theme/muiTheme';

import Keplr from '../../../assets/keplr.png';
import { chainId } from '../../../lib/ledger';
import { useWallet } from '../../../lib/wallet/wallet';
import { getWalletsUiConfig } from './WalletButton.utils';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    paddingRight: theme.spacing(2),
  },
  walletAddress: {
    fontSize: theme.typography.pxToRem(10),
  },
  alert: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  alertIcon: {
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: 0,
  },
  alertMessage: {
    paddingTop: theme.spacing(1),
    '& a': {
      color: theme.palette.secondary.main,
    },
  },
}));

const WalletButton: React.FC = () => {
  const styles = useStyles();
  const { wallet, connect, connectionType, loaded, error, walletConnectUri } =
    useWallet();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] =
    useState<WalletModalState>('wallet-select');

  const onButtonClick = (): void => setIsModalOpen(true);
  const onModalClose = (): void => {
    setIsModalOpen(false);
    setModalState('wallet-select');
  };
  const connectToWallet = useCallback(async (): Promise<void> => {
    if (connect) {
      await connect();
    }
  }, [connect]);

  const walletsUiConfig = useMemo(
    () => getWalletsUiConfig({ connectToWallet, setModalState }),
    [connectToWallet, setModalState],
  );

  return chainId ? (
    <>
      <div className={styles.root}>
        {!wallet?.address && loaded && !connectionType && (
          <OutlinedButton onClick={onButtonClick} sx={{ height: 40 }}>
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
      />
    </>
  ) : (
    <></>
  );
};

export { WalletButton };
