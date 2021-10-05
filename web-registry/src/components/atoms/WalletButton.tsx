import React, { useState } from 'react';
import { useTheme, makeStyles, IconButton } from '@material-ui/core';
import { WalletIcon } from 'web-components/lib/components/icons/WalletIcon';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

interface Keplr {
  enable: (chainId: string) => Promise<void>;
  experimentalSuggestChain: (chainOptions: object) => Promise<void>;
  getKey: (chainId: string) => Promise<ChainKey>;
}

interface ChainKey {
  name: string;
  algo: string;
  pubKey: Uint8Array;
  address: Uint8Array;
  bech32Address: string;
  isNanoLedger: boolean;
}

interface OfflineSigner {
  getAccounts: () => Promise<any>;
}

declare global {
  interface Window {
    keplr?: Keplr;
    getOfflineSigner: (chainId: string) => OfflineSigner;
  }
}

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
  const [wallet, setWallet] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const chainId = 'regen-hambach-1';

  window.onload = async () => {
    if (!wallet) {
      await checkForWallet();
    }
  };

  const checkForWallet = async (): Promise<void> => {
    if (window.keplr && !wallet) {
      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether or not to allow access if they haven't visited this website.
      // Also, it will request user to unlock the wallet if the wallet is locked.
      const key = await window.keplr.getKey(chainId);
      if (key && key.bech32Address) {
        setWallet(key.bech32Address.substring(0, 10) + '...');
      }
    }
  };

  const connectToKeplr = async (): Promise<any> => {
    if (window.keplr) {
      window.keplr
        .experimentalSuggestChain({
          // Chain-id of the Regen chain.
          chainId,
          // The name of the chain to be displayed to the user.
          chainName: 'Regen - Hambach Testnet',
          // RPC endpoint of the chain.
          rpc: 'http://137.184.24.185:26657/',
          // REST endpoint of the chain.
          rest: 'http://137.184.24.185:1337/',
          // Staking coin information
          stakeCurrency: {
            // Coin denomination to be displayed to the user.
            coinDenom: 'REGEN',
            // Actual denom (i.e. uatom, uscrt) used by the blockchain.
            coinMinimalDenom: 'uregen',
            // # of decimal points to convert minimal denomination to user-facing denomination.
            coinDecimals: 6,
            // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
            // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
            // coinGeckoId: ""
          },
          // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
          // The 'stake' button in Keplr extension will link to the webpage.
          // walletUrlForStaking: "",
          // The BIP44 path.
          bip44: {
            // You can only set the coin type of BIP44.
            // 'Purpose' is fixed to 44.
            coinType: 118,
          },
          // Bech32 configuration to show the address to user.
          bech32Config: {
            bech32PrefixAccAddr: 'regen',
            bech32PrefixAccPub: 'regenpub',
            bech32PrefixValAddr: 'regenvaloper',
            bech32PrefixValPub: 'regenvaloperpub',
            bech32PrefixConsAddr: 'regenvalcons',
            bech32PrefixConsPub: 'regenvalconspub',
          },
          // List of all coin/tokens used in this chain.
          currencies: [
            {
              // Coin denomination to be displayed to the user.
              coinDenom: 'REGEN',
              // Actual denom (i.e. uatom, uscrt) used by the blockchain.
              coinMinimalDenom: 'uregen',
              // # of decimal points to convert minimal denomination to user-facing denomination.
              coinDecimals: 6,
              // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
              // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
              // coinGeckoId: ""
            },
          ],
          // List of coin/tokens used as a fee token in this chain.
          feeCurrencies: [
            {
              // Coin denomination to be displayed to the user.
              coinDenom: 'REGEN',
              // Actual denom (i.e. uatom, uscrt) used by the blockchain.
              coinMinimalDenom: 'uregen',
              // # of decimal points to convert minimal denomination to user-facing denomination.
              coinDecimals: 6,
              // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
              // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
              // coinGeckoId: ""
            },
          ],
          // (Optional) The number of the coin type.
          // This field is only used to fetch the address from ENS.
          // Ideally, it is recommended to be the same with BIP44 path's coin type.
          // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
          // So, this is separated to support such chains.
          coinType: 118,
          // (Optional) This is used to set the fee of the transaction.
          // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
          // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
          // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
          },
          // features: ['stargate'],
        })
        .then(() => {
          checkForWallet();
        })
        .catch(() => {
          setWallet('');
        });
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.walletButtonWrapper}>
        <IconButton className={styles.walletButton} onClick={connectToKeplr}>
          <WalletIcon color={wallet ? theme.palette.secondary.main : theme.palette.info.dark} />
        </IconButton>
      </div>
      <span className={styles.walletAddress}>{wallet}</span>
      {showAlert && <ErrorBanner text="Please install Keplr extension to use Regen Ledger features" />}
    </div>
  );
};

export { WalletButton };
