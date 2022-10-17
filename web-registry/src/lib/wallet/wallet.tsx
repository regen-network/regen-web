import React, { createContext, useEffect, useState } from 'react';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { isMobile as checkIsMobile } from '@walletconnect/browser-utils';

import { truncate } from 'web-components/lib/utils/truncate';

import { chainId } from '../ledger';
import { chainInfo } from './chainInfo/chainInfo';
import { walletsConfig } from './walletsConfig/walletsConfig';
import { WalletType } from './walletsConfig/walletsConfig.types';

const AUTO_CONNECT_WALLET_KEY = 'auto_connect_wallet';
const KEPLR_WALLET_EXTENSION = 'keplr-wallet-extension';

const emptySender = { address: '', shortAddress: '' };

export interface Wallet {
  offlineSigner?: OfflineSigner;
  address: string;
  shortAddress: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

type ContextType = {
  wallet?: Wallet;
  loaded: boolean;
  connect?: () => Promise<void>;
  disconnect?: () => void;
  connectionType?: string;
  error?: unknown;
};

const WalletContext = createContext<ContextType>({
  loaded: false,
});

export const WalletProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet>(emptySender);
  const [connectionType, setConnectionType] = useState<string | undefined>(
    undefined,
  );
  // Because initiating the wallet is asyncronous, when users enter the app, the wallet is seen as not loaded.
  // This is being used so that we display the "connect wallet" or the connected wallet address
  // only once we know what's the actual wallet connection status.
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(undefined);

  const disconnect = (): void => {
    setWallet(emptySender);
    setConnectionType(undefined);
    localStorage.removeItem(AUTO_CONNECT_WALLET_KEY);
  };

  const connect = async (): Promise<void> => {
    try {
      await connectWallet(WalletType.Keplr);
      setConnectionType(WalletType.Keplr);
      localStorage.setItem(AUTO_CONNECT_WALLET_KEY, KEPLR_WALLET_EXTENSION);
    } catch (e) {
      setError(e);
    }
  };

  const connectWallet = async (walletType: WalletType): Promise<void> => {
    const wallet = walletsConfig.find(wallet => wallet.type === walletType);
    const walletClient = await wallet?.getClient();
    if (wallet?.type === WalletType.Keplr) {
      await walletClient?.experimentalSuggestChain(chainInfo);
    }
    await walletClient?.enable(chainInfo.chainId);
    const offlineSigner = await walletClient?.getOfflineSignerAuto(
      chainId ?? '',
    );
    const key = await walletClient?.getKey(chainId ?? '');

    if (key && key.bech32Address && offlineSigner) {
      const wallet = {
        offlineSigner,
        address: key.bech32Address,
        shortAddress: truncate(key.bech32Address),
      };
      setWallet(wallet);
    } else {
      throw new Error(
        'Please install Keplr extension to use Regen Ledger feature',
      );
    }
  };

  // Automatically connect wallet if connected before
  useEffect(() => {
    const tryConnectWallet = async (): Promise<void> => {
      try {
        await connectWallet(WalletType.Keplr);
      } catch (e) {
        setError(e);
      } finally {
        setLoaded(true);
      }
    };

    const autoConnectionType = localStorage.getItem(AUTO_CONNECT_WALLET_KEY);
    if (autoConnectionType) {
      tryConnectWallet();
    } else {
      setLoaded(true);
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        loaded,
        connect,
        disconnect,
        connectionType,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): ContextType => React.useContext(WalletContext);
