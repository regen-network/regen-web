import React, { createContext, useEffect, useRef, useState } from 'react';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import WalletConnect from '@walletconnect/client';

import { chainInfo } from './chainInfo/chainInfo';
import { KeplrWalletConnectV1 } from './connectors';
import { ConnectParams, ConnectWalletParams } from './wallet.types';
import { finalizeConnection, getWalletConnectInstance } from './wallet.utils';
import { walletsConfig } from './walletsConfig/walletsConfig';
import { WalletConfig, WalletType } from './walletsConfig/walletsConfig.types';

const AUTO_CONNECT_WALLET_KEY = 'auto_connect_wallet';
const WALLET_CONNECT_KEY = 'walletconnect';

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
  connect?: (params: ConnectParams) => Promise<void>;
  disconnect?: () => void;
  connectionType?: string;
  error?: unknown;
  walletConnectUri?: string;
};

const WalletContext = createContext<ContextType>({
  loaded: false,
});

export const WalletProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet>(emptySender);
  const [connectionType, setConnectionType] = useState<string | undefined>(
    undefined,
  );
  const [walletConnect, setWalletConnect] = useState<
    WalletConnect | undefined
  >();
  const walletConfigRef = useRef<WalletConfig | undefined>();
  // Because initiating the wallet is asyncronous, when users enter the app, the wallet is seen as not loaded.
  // This is being used so that we display the "connect wallet" or the connected wallet address
  // only once we know what's the actual wallet connection status.
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(undefined);
  // If set, opens QR code modal.
  const [walletConnectUri, setWalletConnectUri] = useState<
    string | undefined
  >();

  const onQrCloseCallback = useRef<() => void>();

  const disconnect = async (): Promise<void> => {
    if (walletConnect) {
      await walletConnect.killSession();
    }

    setWallet(emptySender);
    setConnectionType(undefined);
    setWalletConnect(undefined);
    setWalletConnectUri(undefined);
    walletConfigRef.current = undefined;
    localStorage.removeItem(AUTO_CONNECT_WALLET_KEY);
    localStorage.removeItem(WALLET_CONNECT_KEY);
  };

  const connect = async ({ walletType }: ConnectParams): Promise<void> => {
    try {
      await connectWallet({ walletType });
      setConnectionType(walletType);

      if (walletType === WalletType.Keplr) {
        localStorage.setItem(AUTO_CONNECT_WALLET_KEY, WalletType.Keplr);
      } else {
        localStorage.setItem(
          AUTO_CONNECT_WALLET_KEY,
          WalletType.WalletConnectKeplr,
        );
      }
    } catch (e) {
      setError(e);
    }
  };

  const connectWallet = async ({
    walletType,
  }: ConnectWalletParams): Promise<void> => {
    const walletConfig = walletsConfig.find(
      walletConfig => walletConfig.type === walletType,
    );
    walletConfigRef.current = walletConfig;

    let walletConnect;

    if (walletConfig?.type === WalletType.WalletConnectKeplr) {
      walletConnect = await getWalletConnectInstance({
        setWalletConnectUri,
        onQrCloseCallback,
      });
      if (!walletConnect.connected) {
        await walletConnect.createSession();
      }
      setWalletConnect(walletConnect);
    }

    const walletClient = await walletConfig?.getClient({
      chainInfo,
      walletConnect,
    });

    if (
      walletConfig?.type === WalletType.WalletConnectKeplr &&
      walletConnect?.connected
    ) {
      finalizeConnection({ setWallet, walletClient, walletConfig });
    }

    if (walletConfig?.type === WalletType.Keplr) {
      await walletClient?.experimentalSuggestChain(chainInfo);
      finalizeConnection({ setWallet, walletClient, walletConfig });
    }
  };

  // Automatically connect wallet if connected before
  useEffect(() => {
    const autoConnectWalletType = localStorage.getItem(AUTO_CONNECT_WALLET_KEY);

    const tryConnectWallet = async (): Promise<void> => {
      if (autoConnectWalletType) {
        try {
          await connectWallet({
            walletType: autoConnectWalletType as WalletType,
          });
        } catch (e) {
          setError(e);
        } finally {
          setLoaded(true);
        }
      }
    };

    if (autoConnectWalletType) {
      tryConnectWallet();
    } else {
      setLoaded(true);
    }
  }, []);

  // Execute onQrCloseCallback if WalletConnect URI is cleared, since it
  // has now been closed.
  useEffect(() => {
    if (!walletConnectUri && onQrCloseCallback) {
      onQrCloseCallback.current?.();
      onQrCloseCallback.current = undefined;
    }
  }, [walletConnectUri, onQrCloseCallback]);

  useEffect(() => {
    const onWalletConnectEvent = async (): Promise<void> => {
      const walletClient = await walletConfigRef.current?.getClient({
        chainInfo,
        walletConnect,
      });
      if (walletClient instanceof KeplrWalletConnectV1) {
        walletClient.dontOpenAppOnEnable = true;
      }

      finalizeConnection({
        setWallet,
        walletClient: walletClient,
        walletConfig: walletConfigRef.current,
      });
    };

    if (walletConnect) {
      walletConnect.on('connect', error => {
        if (error) {
          throw error;
        }

        onWalletConnectEvent();
      });
    }
  }, [walletConnect]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        loaded,
        connect,
        disconnect,
        connectionType,
        error,
        walletConnectUri,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): ContextType => React.useContext(WalletContext);
