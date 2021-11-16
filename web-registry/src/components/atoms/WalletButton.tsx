import React, { useState } from 'react';
import { useTheme, makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import { WalletIcon } from 'web-components/lib/components/icons/WalletIcon';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

import { useWallet, chainId } from '../../wallet';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  walletButtonWrapper: {
    width: theme.spacing(12),
  },
  walletButton: {
    padding: theme.spacing(2),
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
  const theme = useTheme();
  const { wallet, suggestChain } = useWallet();
  const [showAlert, setShowAlert] = useState(false);

  const connectToKeplr = async (): Promise<void> => {
    if (chainId && suggestChain) {
      await suggestChain();
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  return chainId ? (
    <div className={styles.root}>
      <div className={styles.walletButtonWrapper}>
        <IconButton className={styles.walletButton} onClick={connectToKeplr}>
          <WalletIcon
            color={
              wallet ? theme.palette.secondary.main : theme.palette.info.dark
            }
          />
        </IconButton>
      </div>
      <span className={styles.walletAddress}>{wallet?.shortAddress}</span>
      {showAlert && (
        <ErrorBanner text="Please install Keplr extension to use Regen Ledger features" />
      )}
    </div>
  ) : (
    <></>
  );
};

export { WalletButton };
