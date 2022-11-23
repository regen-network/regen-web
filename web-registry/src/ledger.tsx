import React, { useEffect, useState } from 'react';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { RegenApi } from '@regen-network/api';
import { QueryClientImpl as EcocreditQueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { EcocreditQueryClient } from 'lib/ecocredit/api';

import { expLedger, ledgerExpRPCUri, ledgerRPCUri } from './lib/ledger';
import { useWallet, Wallet } from './lib/wallet/wallet';

interface ContextValue {
  loading: boolean;
  api: RegenApi | undefined;
  ecocreditClient?: EcocreditQueryClient;
  error: unknown;
  wallet?: Wallet;
}

interface ConnectParams {
  forceExp?: boolean;
  signer?: OfflineSigner;
}

export async function connect(
  options?: ConnectParams,
): Promise<RegenApi | undefined> {
  // Create a new instance of the RegenApi class.
  const api = await RegenApi.connect({
    // RegenApi only supports using the Tendermint RPC to interact with a node for now.
    // But it may support other client connections in the future:
    // - via gRPC
    // - via gRPC-web
    // - via REST and gRPC-gateway
    connection: {
      type: 'tendermint',
      // If forceExp = true, then use experimental testnet RPC
      endpoint: options?.forceExp ? ledgerExpRPCUri : ledgerRPCUri,
      // TODO: DISABLED SIGNER
      signer: options?.signer,
      // signer, // OfflineSigner from @cosmjs/proto-signing
    },
  });
  return api;
}

const LedgerContext = React.createContext<ContextValue>({
  loading: false,
  api: undefined,
  ecocreditClient: undefined,
  error: undefined,
});

const getApi = async (
  setApi: React.Dispatch<React.SetStateAction<RegenApi | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<unknown>,
  signer?: OfflineSigner,
  forceExp?: boolean,
): Promise<void> => {
  setLoading(true);
  try {
    const regenApi = await connect({ forceExp, signer });
    setApi(regenApi);
    setLoading(false);
  } catch (e) {
    setError(e);
    setLoading(false);
  }
};

export const LedgerProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [api, setApi] = useState<RegenApi | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(undefined);
  const { wallet } = useWallet();

  useEffect(() => {
    getApi(setApi, setLoading, setError, wallet?.offlineSigner);
  }, [setApi, setLoading, setError, wallet?.offlineSigner]);

  return (
    <LedgerContext.Provider value={{ error, loading, api, wallet }}>
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = (options?: ConnectParams): ContextValue => {
  const [expApi, setExpApi] = useState<RegenApi | undefined>(undefined);
  const [expLoading, setExpLoading] = useState<boolean>(false);
  const [expError, setExpError] = useState<unknown>(undefined);
  const [ecocreditClient, setClientEcocreditClient] =
    useState<EcocreditQueryClient>();
  const context = React.useContext(LedgerContext);
  const { wallet } = useWallet();
  const forceExp =
    !expLedger && // No need to get exp ledger api if it's already used as the primary one
    options?.forceExp;
  const api = forceExp ? expApi : context.api;

  useEffect(() => {
    if (!api?.queryClient) return;
    if (ecocreditClient) return;
    setClientEcocreditClient(new EcocreditQueryClientImpl(api.queryClient));
  }, [api?.queryClient, ecocreditClient]);

  useEffect(() => {
    if (forceExp && !expApi && !expLoading && !expError) {
      getApi(
        setExpApi,
        setExpLoading,
        setExpError,
        wallet?.offlineSigner,
        forceExp,
      );
    }
  }, [
    expApi,
    expLoading,
    expError,
    setExpApi,
    setExpLoading,
    setExpError,
    wallet?.offlineSigner,
    forceExp,
  ]);

  return {
    api,
    ecocreditClient,
    loading: forceExp ? expLoading : context.loading,
    error: forceExp ? expError : context.error,
    wallet,
  };
};
