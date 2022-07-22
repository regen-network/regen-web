import React from 'react';
import { makeStyles } from '@mui/styles';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { chainId } from 'lib/ledger';
import { useWallet } from 'lib/wallet';

import Keplr from 'assets/keplr.png';

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
  const { wallet, connect, connectionType, loaded, error } = useWallet();

  const connectToKeplr = async (): Promise<void> => {
    if (connect) {
      await connect();
    }
  };

  return chainId ? (
    <div className={styles.root}>
      {!wallet?.address && loaded && !connectionType && (
        <OutlinedButton onClick={connectToKeplr} sx={{ height: 40 }}>
          <img className={styles.icon} src={Keplr} alt="keplr" />
          connect wallet
        </OutlinedButton>
      )}
      {error && (
        <ErrorBanner text="Please install Keplr extension to use Regen Ledger features" />
      )}
    </div>
  ) : (
    <></>
  );
};

export { WalletButton };
