import React, { useState, createContext } from 'react';
import {
  assertIsBroadcastTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate';
import { Window as KeplrWindow } from '@keplr-wallet/types';

interface ChainKey {
  name: string;
  algo: string;
  pubKey: Uint8Array;
  address: Uint8Array;
  bech32Address: string;
  isNanoLedger: boolean;
}

interface KeplrWallet {
  address: string;
  shortAddress: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

type ContextType = {
  wallet?: KeplrWallet;
  suggestChain?: () => Promise<void>;
  sendTokens?: (amount: number, recipient: string) => Promise<string>;
};

const WalletContext = createContext<ContextType>({});

export const chainId = process.env.REACT_APP_LEDGER_CHAIN_ID;
const chainName = process.env.REACT_APP_LEDGER_CHAIN_NAME;
const chainRpc = `${process.env.REACT_APP_API_URI}/ledger`;
const chainRestEndpoint = process.env.REACT_APP_LEDGER_REST_ENDPOINT;

export const WalletProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = useState<KeplrWallet | undefined>();

  window.onload = async () => {
    if (!wallet) {
      await getWallet();
    }
  };

  const getWallet = async (): Promise<void> => {
    const key = await checkForWallet();

    if (key && key.bech32Address) {
      const keplrWallet = {
        address: key.bech32Address,
        shortAddress: `${key.bech32Address.substring(0, 10)}...`,
      };
      setWallet(keplrWallet);
    }
  };

  const checkForWallet = async (): Promise<ChainKey | null> => {
    if (chainId && window.keplr) {
      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether or not to allow access if they haven't visited this website.
      // Also, it will request user to unlock the wallet if the wallet is locked.
      return window.keplr.getKey(chainId);
    }
    return null;
  };

  const suggestChain = async (): Promise<void> => {
    if (window.keplr && chainId && chainName && chainRpc && chainRestEndpoint) {
      return window.keplr
        .experimentalSuggestChain({
          // Chain-id of the Regen chain.
          chainId,
          // The name of the chain to be displayed to the user.
          chainName,
          // RPC endpoint of the chain.
          rpc: chainRpc,
          // REST endpoint of the chain.
          rest: chainRestEndpoint,
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
          features: ['stargate'],
        })
        .then(() => {
          getWallet();
        })
        .catch(() => {
          setWallet(undefined);
        });
    }
  };

  const sendTokens = async (
    amount: number,
    recipient: string,
  ): Promise<string> => {
    if (chainId && chainRpc) {
      amount *= 1000000;
      amount = Math.floor(amount);

      await window?.keplr?.enable(chainId);
      const offlineSigner =
        !!window.getOfflineSigner && (await window.getOfflineSigner(chainId));

      if (offlineSigner) {
        const accounts = await offlineSigner.getAccounts();
        const client = await SigningStargateClient.connectWithSigner(
          chainRpc,
          offlineSigner,
        );
        const fee = {
          amount: [
            {
              denom: 'uregen',
              amount: '100',
            },
          ],
          gas: '200000',
        };

        const coinAmount = [
          {
            denom: 'uregen',
            amount: amount.toString(),
          },
        ];
        const result = await client.sendTokens(
          accounts[0].address,
          recipient,
          coinAmount,
          fee,
          'test',
        );
        console.log('result', result);
        assertIsBroadcastTxSuccess(result);

        return result.transactionHash;
        // TODO: error handling
      }
    }
    return Promise.reject('No chain id or enpoint provided');
  };

  return (
    <WalletContext.Provider value={{ wallet, suggestChain, sendTokens }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): ContextType => React.useContext(WalletContext);
