import React, { useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { graphql, useStaticQuery } from 'gatsby';

import { WalletConnectButtonQuery } from '../../generated/graphql';

interface Keplr {
  enable: (chainId: string) => Promise<any>;
  experimentalSuggestChain: (chainOptions: object) => Promise<void>;
}

declare global {
  interface Window {
    keplr?: Keplr;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  walletButton: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(16),
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

const query = graphql`
  query walletConnectButton {
    sanityWalletAddressRegistrationPage {
      walletSection {
        buttonText
        walletFoundButtonText
        _rawNoWalletFound
      }
    }
  }
`;

const WalletConnectionButton: React.FC<{ isKeplrDetected: boolean }> = ({
  isKeplrDetected,
}) => {
  const styles = useStyles();
  const [isChainDetected, setIsChainDetected] = useState(false);
  const { sanityWalletAddressRegistrationPage } =
    useStaticQuery<WalletConnectButtonQuery>(query);
  const data = sanityWalletAddressRegistrationPage?.walletSection;
  const chainId = 'regen-devnet-5';

  const connectToKeplr = async (): Promise<any> => {
    if (window.keplr) {
      window.keplr
        .experimentalSuggestChain({
          // Chain-id of the Regen chain.
          chainId,
          // The name of the chain to be displayed to the user.
          chainName: 'Regen Devnet',
          // RPC endpoint of the chain.
          rpc: 'http://devnet.regen.network:26657',
          // REST endpoint of the chain.
          rest: 'https://devnet.regen.network',
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
          // This field is the interface of
          // {
          //   bech32PrefixAccAddr: string;
          //   bech32PrefixAccPub: string;
          //   bech32PrefixValAddr: string;
          //   bech32PrefixValPub: string;
          //   bech32PrefixConsAddr: string;
          //   bech32PrefixConsPub: string;
          // }
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
          features: ['stargate'],
        })
        .then(() => {
          setIsChainDetected(true);
        })
        .catch(() => {
          setIsChainDetected(false);
        });
    }
  };

  return (
    <div className={styles.walletButton}>
      {isKeplrDetected ? (
        <ContainedButton
          size="large"
          onClick={connectToKeplr}
          disabled={isChainDetected}
        >
          {isChainDetected ? data?.walletFoundButtonText : data?.buttonText}
        </ContainedButton>
      ) : (
        <Alert
          severity="error"
          classes={{
            root: styles.alert,
            icon: styles.alertIcon,
            message: styles.alertMessage,
          }}
        >
          <AlertTitle>
            <BlockContent content={data?._rawNoWalletFound} />
          </AlertTitle>
        </Alert>
      )}
    </div>
  );
};

export default WalletConnectionButton;
