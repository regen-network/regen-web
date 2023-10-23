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

import { PartyByAddrQuery, useGetCurrentAccountQuery } from 'generated/graphql';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { useTracker } from 'lib/tracker/useTracker';

import { useAddAddress } from './hooks/useAddAddress';
import { useAutoConnect } from './hooks/useAutoConnect';
import { useConnect } from './hooks/useConnect';
import { useConnectWallet } from './hooks/useConnectWallet';
import { useDetectKeplrMobileBrowser } from './hooks/useDetectKeplrMobileBrowser';
import { useDisconnect } from './hooks/useDisconnect';
import { useHandleAddAddress } from './hooks/useHandleAddAddress';
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
  addAddr?: boolean;
}
export type SignArbitraryType = (
  signArbitraryParams: SignArbitraryParams,
) => Promise<StdSignature | undefined>;

export type WalletContextType = {
  wallet?: Wallet;
  loaded: boolean;
  connect?: (params: ConnectParams) => Promise<void>;
  disconnect?: () => void;
  handleAddAddress?: () => Promise<void>;
  connectionType?: string;
  error?: unknown;
  walletConnectUri?: string;
  signArbitrary?: SignArbitraryType;
  accountId?: string;
  isConnected: boolean;
  partyByAddr?: PartyByAddrQuery | null;
  accountChanging: boolean;
  isKeplrMobileWeb: boolean;
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
  const [accountId, setAccountId] = useState<string | undefined>(undefined);
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
  const login = useLogin({ signArbitrary, setError, setAccountId });
  const logout = useLogout({ setError, setAccountId });

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

  const addAddress = useAddAddress({ signArbitrary, setError, setWallet });
  const handleAddAddress = useHandleAddAddress({
    wallet,
    walletConfigRef,
    accountId,
    addAddress,
  });

  useAutoConnect({
    connectWallet,
    setError,
    setLoaded,
  });
  useOnAccountChange({
    connectWallet,
    wallet,
    keplrMobileWeb,
    walletConfigRef,
    accountId,
    addAddress,
    setAccountChanging,
  });
  useDetectKeplrMobileBrowser({
    connectWallet,
    loaded,
    wallet,
    setKeplrMobileWeb,
  });

  const { data } = useGetCurrentAccountQuery();
  useEffect(() => {
    if (data?.getCurrentAccount) setAccountId(data?.getCurrentAccount);
  }, [data?.getCurrentAccount]);

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));
  const { data: partyByAddr, isFetching } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: wallet?.address ?? '',
      enabled: !!wallet?.address && !!graphqlClient && !!csrfData,
    }),
  );
  const loginDisabled = keplrMobileWeb || !!walletConnect;

  return (
    <WalletContext.Provider
      value={{
        wallet,
        loaded: loaded && !isFetching,
        connect,
        disconnect,
        handleAddAddress: loginDisabled ? undefined : handleAddAddress,
        connectionType,
        error,
        signArbitrary,
        accountId,
        partyByAddr,
        accountChanging,
        isConnected:
          !!wallet?.address &&
          // signArbitrary (used in login) not yet supported by @keplr-wallet/wc-client
          // https://github.com/chainapsis/keplr-wallet/issues/664
          (loginDisabled ||
            (!!accountId &&
              partyByAddr?.walletByAddr?.partyByWalletId?.accountId ===
                accountId)),
        isKeplrMobileWeb: keplrMobileWeb,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType =>
  React.useContext(WalletContext);
