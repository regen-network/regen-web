import React, { createContext, useEffect, useRef, useState } from 'react';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { isMobile as checkIsMobile } from '@walletconnect/browser-utils';

import { truncate } from 'web-components/lib/utils/truncate';

import { chainId } from '../ledger';
import { chainInfo } from './chainInfo/chainInfo';
import { KeplrWalletConnectV1 } from './connectors';
import { ConnectWalletParams } from './wallet.types';
import { getWalletConnectInstance } from './wallet.utils';
import { walletsConfig } from './walletsConfig/walletsConfig';
import { WalletType } from './walletsConfig/walletsConfig.types';

const AUTO_CONNECT_WALLET_KEY = 'auto_connect_wallet';

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

  const disconnect = (): void => {
    setWallet(emptySender);
    setConnectionType(undefined);
    localStorage.removeItem(AUTO_CONNECT_WALLET_KEY);
  };

  const connect = async (): Promise<void> => {
    try {
      if (checkIsMobile()) {
        await connectWallet({ walletType: WalletType.WalletConnectKeplr });
        setConnectionType(WalletType.WalletConnectKeplr);
      } else {
        await connectWallet({ walletType: WalletType.Keplr });
        setConnectionType(WalletType.Keplr);
        localStorage.setItem(AUTO_CONNECT_WALLET_KEY, WalletType.Keplr);
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
    let walletConnect;
    let offlineSigner;
    if (walletConfig?.type === WalletType.WalletConnectKeplr) {
      walletConnect = await getWalletConnectInstance({
        setWalletConnectUri,
        onQrCloseCallback,
      });
      await walletConnect.connect();
    }
    const walletClient = await walletConfig?.getClient({
      chainInfo,
      walletConnect,
    });
    if (walletClient instanceof KeplrWalletConnectV1) {
      // walletClient.dontOpenAppOnEnable = true;
    }
    if (walletConfig?.type === WalletType.Keplr) {
      await walletClient?.experimentalSuggestChain(chainInfo);
    }
    try {
      await walletClient?.enable(chainInfo.chainId);
    } catch (e) {
      alert(e);
    }

    if (walletClient) {
      offlineSigner = await walletConfig?.getOfflineSignerFunction(
        walletClient,
      )(chainInfo.chainId);
    }

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
        await connectWallet({ walletType: WalletType.Keplr });
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

  // Execute onQrCloseCallback if WalletConnect URI is cleared, since it
  // has now been closed.
  useEffect(() => {
    if (!walletConnectUri && onQrCloseCallback) {
      onQrCloseCallback.current?.();
      onQrCloseCallback.current = undefined;
    }
  }, [walletConnectUri, onQrCloseCallback]);

  useEffect(() => {
    if (walletConnectUri) {
      const navigateToAppURL = `intent://wcV1?${walletConnectUri}#Intent;package=com.chainapsis.keplr;scheme=keplrwallet;end;`;
      // window.location.href = navigateToAppURL;
    }
  }, [walletConnectUri]);

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
