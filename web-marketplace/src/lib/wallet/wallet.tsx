import React, { createContext, useEffect, useRef, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { StdSignature } from '@cosmjs/launchpad';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { State } from '@cosmos-kit/core';
import {
  useWallet as useCosmosKitWallet,
  useWalletClient,
} from '@cosmos-kit/react-lite';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { useQuery } from '@tanstack/react-query';
import truncate from 'lodash/truncate';

import { AccountByAddrQuery } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
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
import { emptySender, KEPLR_MOBILE } from './wallet.constants';
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
  wallet?: Wallet;
};
export type LoginType = (loginParams: LoginParams) => Promise<void>;

export interface SignArbitraryParams extends LoginParams {
  nonce: string;
  connectWallet?: boolean;
}
export type SignArbitraryType = (
  signArbitraryParams: SignArbitraryParams,
) => Promise<StdSignature | undefined>;

export type WalletContextType = {
  wallet?: Wallet;
  walletConfig?: WalletConfig;
  loaded: boolean;
  connect?: (params: ConnectParams) => Promise<void>;
  disconnect?: () => void;
  handleAddAddress?: () => Promise<void>;
  connectionType?: string;
  error?: unknown;
  walletConnectUri?: string;
  signArbitrary?: SignArbitraryType;
  isConnected: boolean;
  accountChanging: boolean;
  isKeplrMobileWeb: boolean;
  accountByAddr?: AccountByAddrQuery['accountByAddr'];
};

const WalletContext = createContext<WalletContextType>({
  loaded: false,
  isConnected: false,
  accountChanging: false,
  isKeplrMobileWeb: false,
});

export const WalletProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Because initiating the wallet is asyncronous, when users enter the app, the wallet is seen as not loaded.
  // This is being used so that we display the "connect wallet" or the connected wallet address
  // only once we know what's the actual wallet connection status.
  const [loaded, setLoaded] = useState<boolean>(false);
  const [wallet, setWallet] = useState<Wallet>(emptySender);
  const [accountChanging, setAccountChanging] = useState<boolean>(false);
  const {
    activeAccountId,
    activeAccount,
    authenticatedAccountIds,
    loading: authLoading,
  } = useAuth();
  const [connectionType, setConnectionType] = useState<string | undefined>(
    undefined,
  );
  const [keplrMobileWeb, setKeplrMobileWeb] = useState<boolean>(false);
  const walletConfigRef = useRef<WalletConfig | undefined>();
  const [error, setError] = useState<unknown>(undefined);
  const { track } = useTracker();

  // Connecting via Wallet Connect is handled entirely using @cosmos-kit
  const [walletConnect, setWalletConnect] = useState<boolean>(false);
  const { status, client: walletConnectClient } = useWalletClient(KEPLR_MOBILE);
  const { mainWallet } = useCosmosKitWallet(KEPLR_MOBILE);
  const address = mainWallet?.getChainWallet('regen')?.address;

  useEffect(() => {
    if (status === State.Done) {
      const offlineSigner =
        walletConnectClient?.getOfflineSignerAmino?.('regen-1');
      if (offlineSigner && address) {
        setWallet({
          offlineSigner,
          address,
          shortAddress: truncate(address),
        });
        setWalletConnect(true);
      }
    }
  }, [address, status, walletConnectClient]);

  const signArbitrary = useSignArbitrary({
    setError,
  });
  const login = useLogin({ signArbitrary, setError });
  const logout = useLogout({ setError });

  const connectWallet = useConnectWallet({
    setWallet,
    setKeplrMobileWeb,
    walletConfigRef,
    track,
    login,
  });

  const connect = useConnect({ connectWallet, setConnectionType, setError });

  const disconnect = useDisconnect({
    setConnectionType,
    setWallet,
    walletConfigRef,
    logout,
    walletConnect,
  });

  useAutoConnect({
    connectWallet,
    setError,
    setLoaded,
    activeAccountHasAddr: !authLoading && !!activeAccount?.addr,
  });
  useOnAccountChange({
    connectWallet,
    wallet,
    keplrMobileWeb,
    walletConfigRef,
    activeAccountId,
    authenticatedAccountIds,
    setAccountChanging,
  });
  useDetectKeplrMobileBrowser({
    connectWallet,
    loaded,
    wallet,
    setKeplrMobileWeb,
  });

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));
  const { data: accountByAddrData, isFetching } = useQuery(
    getAccountByAddrQuery({
      client: graphqlClient,
      addr: wallet?.address ?? '',
      enabled: !!wallet?.address && !!graphqlClient && !!csrfData,
    }),
  );
  const accountByAddr = accountByAddrData?.accountByAddr;
  const loginDisabled = keplrMobileWeb || !!walletConnect;

  return (
    <WalletContext.Provider
      value={{
        wallet,
        walletConfig: walletConfigRef.current,
        loaded: loaded && !isFetching && (loginDisabled || !authLoading),
        connect,
        disconnect,
        connectionType,
        error,
        signArbitrary,
        accountChanging,
        accountByAddr,
        isConnected:
          !!wallet?.address &&
          // signArbitrary (used in login) not yet supported by @keplr-wallet/wc-client
          // https://github.com/chainapsis/keplr-wallet/issues/664
          (loginDisabled ||
            (!!activeAccountId && accountByAddr?.id === activeAccountId)),
        isKeplrMobileWeb: keplrMobileWeb,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType =>
  React.useContext(WalletContext);
