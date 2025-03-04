import React, { createContext, useEffect, useRef, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { StdSignature } from '@cosmjs/launchpad';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { WalletStatus } from '@cosmos-kit/core';
import {
  useChain,
  useManager,
  useWallet as useCosmosKitWallet,
  useWalletClient,
} from '@cosmos-kit/react-lite';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import truncate from 'lodash/truncate';

import { AccountByAddrQuery, Maybe } from 'generated/graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { ConnectEvent } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import { useAutoConnect } from './hooks/useAutoConnect';
import { useConnect } from './hooks/useConnect';
import { ConnectWalletType, useConnectWallet } from './hooks/useConnectWallet';
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
  doLogout?: boolean;
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
  activeWalletAddr?: Maybe<string>;
  loginDisabled: boolean;
  loaded: boolean;
  connect?: (params: ConnectParams) => Promise<void>;
  connectWallet?: ConnectWalletType;
  disconnect?: () => void;
  handleAddAddress?: () => Promise<void>;
  connectionType?: string;
  error?: unknown;
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
  loginDisabled: false,
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
  const { activeAccountId, activeAccount, loading: authLoading } = useAuth();
  const [connectionType, setConnectionType] = useState<string | undefined>(
    undefined,
  );
  const [keplrMobileWeb, setKeplrMobileWeb] = useState<boolean>(false);
  const walletConfigRef = useRef<WalletConfig | undefined>();
  const [error, setError] = useState<unknown>(undefined);
  const { track } = useTracker();

  // Connecting via Wallet Connect is handled entirely using @cosmos-kit
  const [walletConnect, setWalletConnect] = useState<boolean>(false);
  const { closeView } = useChain('regen', false);
  const { client: walletConnectClient } = useWalletClient(KEPLR_MOBILE);
  const { mainWallet } = useCosmosKitWallet(KEPLR_MOBILE);
  const { walletRepos } = useManager();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const address = mainWallet?.getChainWallet('regen')?.address;
  const walletStatus = walletRepos[0]?.current?.walletStatus;
  console.log(`walletStatus: ${walletStatus}`);

  useEffect(() => {
    if (
      walletStatus === WalletStatus.Connected &&
      address &&
      !wallet?.offlineSigner
    ) {
      const offlineSigner =
        walletConnectClient?.getOfflineSignerAmino?.('regen-1');
      console.log(`offlineSigner: ${offlineSigner}`);

      if (offlineSigner) {
        closeView();
        setWallet({
          offlineSigner,
          address,
          shortAddress: truncate(address),
        });
        setWalletConnect(true);
        track<ConnectEvent>('loginWalletConnect', {
          date: new Date().toUTCString(),
          account: address,
        });
      }
    }
  }, [
    address,
    walletStatus,
    walletConnectClient,
    closeView,
    wallet?.offlineSigner,
    track,
  ]);

  const signArbitrary = useSignArbitrary({
    setError,
  });
  const logout = useLogout({ setError });
  const login = useLogin({ signArbitrary, setError, logout, track });

  const connectWallet = useConnectWallet({
    setWallet,
    setKeplrMobileWeb,
    walletConfigRef,
    login,
    track,
  });

  const connect = useConnect({ connectWallet, setConnectionType, setError });

  const disconnect = useDisconnect({
    setConnectionType,
    setWallet,
    walletConfigRef,
    logout,
    walletConnect,
    setWalletConnect,
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
    activeAccount,
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
      languageCode: selectedLanguage,
    }),
  );
  const accountByAddr = accountByAddrData?.accountByAddr;
  const loginDisabled = keplrMobileWeb || !!walletConnect;
  const activeWalletAddr = loginDisabled
    ? wallet?.address
    : activeAccount?.addr;

  return (
    <WalletContext.Provider
      value={{
        wallet,
        walletConfig: walletConfigRef.current,
        activeWalletAddr,
        loginDisabled,
        loaded: loaded && !isFetching && (loginDisabled || !authLoading),
        connect,
        connectWallet,
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
