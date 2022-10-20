import React, { createContext, useRef, useState } from 'react';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import WalletConnect from '@walletconnect/client';

import { useAutoConnect } from './hooks/useAutoConnect';
import { useConnect } from './hooks/useConnect';
import { useConnectWallet } from './hooks/useConnectWallet';
import { useDisconnect } from './hooks/useDisconnect';
import { useWalletConnectCallback } from './hooks/useWalletConnectCallback';
import { useWalletConnectFinalize } from './hooks/useWalletConnectFinalize';
import { emptySender } from './wallet.constants';
import { ConnectParams } from './wallet.types';
import { WalletConfig } from './walletsConfig/walletsConfig.types';

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
  // Because initiating the wallet is asyncronous, when users enter the app, the wallet is seen as not loaded.
  // This is being used so that we display the "connect wallet" or the connected wallet address
  // only once we know what's the actual wallet connection status.
  const [loaded, setLoaded] = useState<boolean>(false);
  const [wallet, setWallet] = useState<Wallet>(emptySender);
  const [connectionType, setConnectionType] = useState<string | undefined>(
    undefined,
  );
  const [walletConnect, setWalletConnect] = useState<
    WalletConnect | undefined
  >();
  const walletConfigRef = useRef<WalletConfig | undefined>();
  const [error, setError] = useState<unknown>(undefined);
  const [walletConnectUri, setWalletConnectUri] = useState<
    string | undefined
  >();

  const onQrCloseCallback = useRef<() => void>();

  const disconnect = useDisconnect({
    setConnectionType,
    setWallet,
    setWalletConnect,
    setWalletConnectUri,
    walletConfigRef,
    walletConnect,
  });

  const connectWallet = useConnectWallet({
    onQrCloseCallback,
    setWallet,
    setWalletConnect,
    setWalletConnectUri,
    walletConfigRef,
  });

  const connect = useConnect({ connectWallet, setConnectionType, setError });

  useAutoConnect({ connectWallet, setError, setLoaded });
  useWalletConnectCallback({ onQrCloseCallback, walletConnectUri });
  useWalletConnectFinalize({ setWallet, walletConfigRef, walletConnect });

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
