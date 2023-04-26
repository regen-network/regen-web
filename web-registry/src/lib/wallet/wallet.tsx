import React, { createContext, useEffect, useRef, useState } from 'react';
import { StdSignature } from '@cosmjs/launchpad';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import WalletConnect from '@walletconnect/client';

import { useGetCurrentAccountQuery } from 'generated/graphql';
import { useTracker } from 'lib/tracker/useTracker';

import { useAutoConnect } from './hooks/useAutoConnect';
import { useConnect } from './hooks/useConnect';
import { useConnectWallet } from './hooks/useConnectWallet';
import { useDetectKeplrMobileBrowser } from './hooks/useDetectKeplrMobileBrowser';
import { useDisconnect } from './hooks/useDisconnect';
import { useLogin } from './hooks/useLogin';
import { useLogout } from './hooks/useLogout';
import { useOnAccountChange } from './hooks/useOnAccountChange';
import { useSignArbitrary } from './hooks/useSignArbitrary';
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

export type LoginParams = {
  walletConfig?: WalletConfig;
  walletConnect?: WalletConnect;
  wallet?: Wallet;
};
export type LoginType = (loginParams: LoginParams) => Promise<void>;

export interface SignArbitraryParams extends LoginParams {
  nonce: string;
}
export type SignArbitraryType = (
  signArbitraryParams: SignArbitraryParams,
) => Promise<StdSignature | undefined>;

export type WalletContextType = {
  wallet?: Wallet;
  loaded: boolean;
  connect?: (params: ConnectParams) => Promise<void>;
  disconnect?: () => void;
  connectionType?: string;
  error?: unknown;
  walletConnectUri?: string;
  signArbitrary?: SignArbitraryType;
  login?: LoginType;
  logout?: () => Promise<void>;
  accountId?: string;
  walletConfig?: WalletConfig;
  walletConnect?: WalletConnect;
  isConnected: boolean;
};
const WalletContext = createContext<WalletContextType>({
  loaded: false,
  isConnected: false,
});

export const WalletProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Because initiating the wallet is asyncronous, when users enter the app, the wallet is seen as not loaded.
  // This is being used so that we display the "connect wallet" or the connected wallet address
  // only once we know what's the actual wallet connection status.
  const [loaded, setLoaded] = useState<boolean>(false);
  const [wallet, setWallet] = useState<Wallet>(emptySender);
  const [accountId, setAccountId] = useState<string | undefined>(undefined);
  const [connectionType, setConnectionType] = useState<string | undefined>(
    undefined,
  );
  const [walletConnect, setWalletConnect] = useState<
    WalletConnect | undefined
  >();
  const [keplrMobileWeb, setKeplrMobileWeb] = useState<boolean>(false);
  const walletConfigRef = useRef<WalletConfig | undefined>();
  const [error, setError] = useState<unknown>(undefined);
  const [walletConnectUri, setWalletConnectUri] = useState<
    string | undefined
  >();
  const { track } = useTracker();

  const onQrCloseCallbackRef = useRef<() => void>();

  const signArbitrary = useSignArbitrary({
    setError,
  });
  const login = useLogin({ signArbitrary, setError, setAccountId });
  const logout = useLogout({ setError, setAccountId });

  const connectWallet = useConnectWallet({
    onQrCloseCallbackRef,
    setWallet,
    setWalletConnect,
    setWalletConnectUri,
    setKeplrMobileWeb,
    walletConfigRef,
    track,
    login,
  });

  const connect = useConnect({ connectWallet, setConnectionType, setError });

  const disconnect = useDisconnect({
    setConnectionType,
    setWallet,
    setWalletConnect,
    setWalletConnectUri,
    walletConfigRef,
    walletConnect,
    logout,
  });

  useAutoConnect({ connectWallet, setError, setLoaded });
  useOnAccountChange({ connectWallet, wallet });
  useDetectKeplrMobileBrowser({
    connectWallet,
    loaded,
    wallet,
    setKeplrMobileWeb,
  });
  useWalletConnectCallback({ onQrCloseCallbackRef, walletConnectUri });
  useWalletConnectFinalize({
    setWallet,
    walletConfigRef,
    walletConnect,
    login,
  });

  const { data } = useGetCurrentAccountQuery();
  useEffect(() => {
    if (data?.getCurrentAccount) setAccountId(data?.getCurrentAccount);
  }, [data?.getCurrentAccount]);

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
        signArbitrary,
        login,
        logout,
        accountId,
        walletConfig: walletConfigRef?.current,
        walletConnect,
        isConnected:
          !!wallet?.address &&
          // signArbitrary (used in login) not yet supported by @keplr-wallet/wc-client
          // https://github.com/chainapsis/keplr-wallet/issues/664
          (keplrMobileWeb || !!walletConnect || !!accountId),
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType =>
  React.useContext(WalletContext);
