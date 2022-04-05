import React, { useState, createContext } from 'react';
import { SigningStargateClient, DeliverTxResponse } from '@cosmjs/stargate';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { OfflineSigner } from '@cosmjs/proto-signing';

import { truncate } from 'web-components/lib/utils/truncate';

import { ledgerRPCUri, ledgerRESTUri, chainId } from './ledger';

interface ChainKey {
  name: string;
  algo: string;
  pubKey: Uint8Array;
  address: Uint8Array;
  bech32Address: string;
  isNanoLedger: boolean;
}

export interface Sender {
  offlineSigner?: OfflineSigner;
  address: string;
  shortAddress: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

type ContextType = {
  wallet?: Sender;
  loaded: boolean;
  suggestChain?: () => Promise<void>;
  signSend?: (amount: number, recipient: string) => Promise<Uint8Array>;
  broadcast?: (txBytes: Uint8Array) => Promise<string>;
  txResult?: DeliverTxResponse;
  setTxResult: (txResult: DeliverTxResponse | undefined) => void;
};

const WalletContext = createContext<ContextType>({
  loaded: false,
  setTxResult: (txResult: DeliverTxResponse | undefined) => {},
});

const chainName = process.env.REACT_APP_LEDGER_CHAIN_NAME;

const emptySender = { address: '', shortAddress: '' };
const defaultClientOptions = {
  broadcastPollIntervalMs: 1000,
  broadcastTimeoutMs: 600000,
};

export const WalletProvider: React.FC = ({ children }) => {
  const [sender, setSender] = useState<Sender>(emptySender);
  // Because initiating the wallet is asyncronous, when users enter the app, the wallet is seen as not loaded.
  // This is being used so that we display the "connect wallet" or the connected wallet address
  // only once we know what's the actual wallet connection status.
  const [loaded, setLoaded] = useState<boolean>(false);
  const [txResult, setTxResult] = useState<DeliverTxResponse | undefined>(
    undefined,
  );

  window.onload = async () => {
    if (!sender.address) {
      try {
        // This should be updated to use the AccountStore from '@keplr-wallet/stores'
        // so that the user can connect his/her wallet on demand,
        // and not automatically on load if he/she hasn't connected yet.
        await getWallet();
      } catch (e) {
        // For now, this error will only happen if we're trying to connect to a testnet
        // which hasn't been added yet through experimentalSuggestChain.
        // In this case, the user will see the "connect wallet" button and should click on it.
        // eslint-disable-next-line
        console.log(e);
      } finally {
        setLoaded(true);
      }
    }
  };

  const getWallet = async (): Promise<void> => {
    const key = await checkForWallet();
    const offlineSigner = await getOfflineSigner();
    if (key && key.bech32Address && offlineSigner) {
      const sender = {
        offlineSigner,
        address: key.bech32Address,
        shortAddress: truncate(key.bech32Address),
      };
      setSender(sender);
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
    if (window.keplr && chainId && chainName && ledgerRPCUri && ledgerRESTUri) {
      return window.keplr
        .experimentalSuggestChain({
          // Chain-id of the Regen chain.
          chainId,
          // The name of the chain to be displayed to the user.
          chainName,
          // RPC endpoint of the chain.
          rpc: ledgerRPCUri,
          // REST endpoint of the chain.
          rest: ledgerRESTUri,
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
          setSender(emptySender);
        });
    }
  };

  /**
   * Sign a transaction for sending tokens to a reciptient
   */
  // TODO Remove, we don't need this anymore, we should use @regen-network/api instead
  const signSend = async (
    amount: number,
    recipient: string,
  ): Promise<Uint8Array> => {
    amount *= 1000000;
    amount = Math.floor(amount);

    const client = await getClient();
    const fee = {
      amount: [
        {
          denom: 'uregen',
          amount: '100', //TODO: what should fee and gas be?
        },
      ],
      gas: '200000',
    };

    const msgSend = {
      fromAddress: sender.address,
      toAddress: recipient,
      amount: [
        {
          denom: 'uregen',
          amount: amount.toString(),
        },
      ],
    };
    const msgAny = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: msgSend,
    };

    try {
      const txRaw = await client.sign(sender.address, [msgAny], fee, '');
      const txBytes = TxRaw.encode(txRaw).finish();
      return txBytes;
    } catch (err) {
      alert(`Client sign error: ${err}`);
      return Promise.reject();
    }
  };

  /**
   * Broadcast a signed transaction and wait for transaction hash
   */
  // TODO Remove, we don't need this anymore, we should use @regen-network/api instead
  const broadcast = async (signedTxBytes: Uint8Array): Promise<string> => {
    const client = await getClient();
    const result = await client.broadcastTx(signedTxBytes);
    setTxResult(result);

    return result.transactionHash;
  };

  const getOfflineSigner = async (): Promise<OfflineSigner | undefined> => {
    if (chainId && window?.keplr) {
      try {
        await window.keplr.enable(chainId);
        const offlineSigner = window.getOfflineSignerAuto
          ? await window.getOfflineSignerAuto(chainId)
          : undefined;
        return offlineSigner;
      } catch (err) {
        alert(`Wallet error: ${err}`);
        return Promise.reject();
      }
    }
    return Promise.reject('No chain id provided');
  };

  // TODO Remove, we don't need this anymore, we should use @regen-network/api instead
  const getClient = async (): Promise<SigningStargateClient> => {
    if (chainId && ledgerRPCUri) {
      try {
        await window?.keplr?.enable(chainId);
        const offlineSigner =
          !!window.getOfflineSignerAuto &&
          (await window.getOfflineSignerAuto(chainId));

        if (offlineSigner) {
          if (!sender.address) {
            const [senderAccount] = await offlineSigner.getAccounts();
            setSender({
              address: senderAccount.address,
              shortAddress: `${senderAccount.address.substring(0, 10)}...`,
            });
          }

          const client = await SigningStargateClient.connectWithSigner(
            ledgerRPCUri,
            offlineSigner,
            defaultClientOptions,
          );

          return client;
        }
      } catch (err) {
        alert(`Wallet error: ${err}`);
        return Promise.reject();
      }
    }
    return Promise.reject('No chain id or endpoint provided');
  };

  return (
    <WalletContext.Provider
      value={{
        wallet: sender,
        loaded,
        suggestChain,
        signSend,
        broadcast,
        txResult,
        setTxResult,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): ContextType => React.useContext(WalletContext);
