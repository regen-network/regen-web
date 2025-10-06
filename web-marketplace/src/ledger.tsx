import React, { useEffect, useState } from 'react';
import { GeneratedType, OfflineSigner, Registry } from '@cosmjs/proto-signing';
import { AminoTypes, SigningStargateClient } from '@cosmjs/stargate';
import {
  cosmosAminoConverters,
  cosmosProtoRegistry,
  ibc,
  ibcAminoConverters,
  ibcProtoRegistry,
  regen,
  regenAminoConverters,
  regenProtoRegistry,
} from '@regen-network/api';
import { chains } from 'chain-registry';

import { UseStateSetter } from 'types/react/use-state';

import { ledgerRPCUri } from './lib/ledger';
import { useWallet, Wallet } from './lib/wallet/wallet';

const chain = chains.find(({ chain_name }) => chain_name === 'regen');

export type QueryClient = Awaited<
  ReturnType<typeof regen.ClientFactory.createRPCQueryClient>
> &
  Awaited<ReturnType<typeof ibc.ClientFactory.createRPCQueryClient>>;

interface ContextValue {
  loading: boolean;
  signingClient?: SigningStargateClient;
  queryClient?: QueryClient;
  error: unknown;
}

interface ConnectParams {
  signer?: OfflineSigner;
}

const LedgerContext = React.createContext<ContextValue>({
  loading: false,
  signingClient: undefined,
  queryClient: undefined,
  error: undefined,
});

type StargateOfflineSigner = Parameters<
  typeof SigningStargateClient.connectWithSigner
>[1];
type StargateConnectOptions = Parameters<
  typeof SigningStargateClient.connectWithSigner
>[2];

export async function setupSigningClient(
  setSigningClient: UseStateSetter<SigningStargateClient | undefined>,
  setLoading: UseStateSetter<boolean>,
  setError: UseStateSetter<unknown>,
  signer: OfflineSigner,
): Promise<void> {
  if (chain && ledgerRPCUri) {
    const protoRegistry: ReadonlyArray<[string, GeneratedType]> = [
      ...cosmosProtoRegistry,
      ...ibcProtoRegistry,
      ...regenProtoRegistry,
    ];

    const aminoConverters = {
      ...cosmosAminoConverters,
      ...ibcAminoConverters,
      ...regenAminoConverters,
    } as const;

    const buildLocalRegistry = (
      entries: ReadonlyArray<[string, GeneratedType]>,
    ): Registry => {
      const r = new Registry();
      for (const [typeUrl, generatedType] of entries) {
        r.register(typeUrl, generatedType);
      }
      return r;
    };

    const registry = buildLocalRegistry(protoRegistry);
    const aminoTypes = new AminoTypes(aminoConverters);

    setLoading(true);
    try {
      const options: StargateConnectOptions = {
        registry:
          registry as unknown as NonNullable<StargateConnectOptions>['registry'],
        aminoTypes,
      };

      const signingClient = await SigningStargateClient.connectWithSigner(
        ledgerRPCUri,
        signer as unknown as StargateOfflineSigner,
        options,
      );
      setSigningClient(signingClient);
      setLoading(false);
    } catch (e) {
      setError(e as unknown);
      setLoading(false);
    }
  }
}

export async function getRPCQueryClient(): Promise<QueryClient> {
  const { createRPCQueryClient } = regen.ClientFactory;
  const client = await createRPCQueryClient({
    rpcEndpoint: ledgerRPCUri,
  });

  const { createRPCQueryClient: createRPCQueryIBClient } = ibc.ClientFactory;
  const ibcClient = await createRPCQueryIBClient({
    rpcEndpoint: ledgerRPCUri,
  });

  return { ...ibcClient, ...client } as QueryClient;
}

async function setupRPCQueryClient(
  setQueryClient: UseStateSetter<QueryClient | undefined>,
  setLoading: UseStateSetter<boolean>,
  setError: UseStateSetter<unknown>,
): Promise<void> {
  if (ledgerRPCUri) {
    setLoading(true);
    try {
      const queryClient = await getRPCQueryClient();
      setQueryClient(queryClient);
      setLoading(false);
    } catch (e) {
      setError(e as unknown);
      setLoading(false);
    }
  }
}

export const LedgerProviderWithWallet: React.FC<React.PropsWithChildren<{}>> =
  ({ children }) => {
    const { wallet } = useWallet();

    return <LedgerProvider wallet={wallet}>{children}</LedgerProvider>;
  };

export const LedgerProvider: React.FC<
  React.PropsWithChildren<{ wallet?: Wallet }>
> = ({ wallet, children }) => {
  const [signingClient, setSigningClient] = useState<
    SigningStargateClient | undefined
  >();
  const [queryClient, setQueryClient] = useState<QueryClient | undefined>();
  const [loadingSigningClient, setLoadingSigningClient] =
    useState<boolean>(false);
  const [loadingQueryClient, setLoadingQueryClient] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    if (!!wallet?.offlineSigner && !signingClient)
      setupSigningClient(
        setSigningClient,
        setLoadingSigningClient,
        setError,
        wallet?.offlineSigner,
      );
  }, [wallet?.offlineSigner, signingClient]);

  useEffect(() => {
    setupRPCQueryClient(setQueryClient, setLoadingQueryClient, setError);
  }, []);

  return (
    <LedgerContext.Provider
      value={{
        error,
        loading: loadingSigningClient || loadingQueryClient,
        signingClient,
        queryClient,
      }}
    >
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = (options?: ConnectParams): ContextValue =>
  React.useContext(LedgerContext);
