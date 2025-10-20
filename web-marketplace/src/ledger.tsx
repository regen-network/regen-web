import React, { useEffect, useState } from 'react';
import {
  createWasmAminoConverters,
  SigningCosmWasmClient,
  wasmTypes,
} from '@cosmjs/cosmwasm-stargate';
import { GeneratedType, OfflineSigner, Registry } from '@cosmjs/proto-signing';
import { AminoTypes, GasPrice, SigningStargateClient } from '@cosmjs/stargate';
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
  signingCosmWasmClient?: SigningCosmWasmClient;
  queryClient?: QueryClient;
  error: unknown;
}

interface ConnectParams {
  signer?: OfflineSigner;
}

const LedgerContext = React.createContext<ContextValue>({
  loading: false,
  signingClient: undefined,
  signingCosmWasmClient: undefined,
  queryClient: undefined,
  error: undefined,
});

type StargateOfflineSigner = Parameters<
  typeof SigningStargateClient.connectWithSigner
>[1];
type StargateConnectOptions = Parameters<
  typeof SigningStargateClient.connectWithSigner
>[2];
type CosmWasmOfflineSigner = Parameters<
  typeof SigningCosmWasmClient.connectWithSigner
>[1];
type CosmWasmConnectOptions = Parameters<
  typeof SigningCosmWasmClient.connectWithSigner
>[2];

export async function setupSigningClient(
  setSigningClient: UseStateSetter<SigningStargateClient | undefined>,
  setSigningCosmWasmClient: UseStateSetter<SigningCosmWasmClient | undefined>,
  setLoading: UseStateSetter<boolean>,
  setError: UseStateSetter<unknown>,
  signer: OfflineSigner,
): Promise<void> {
  if (chain && ledgerRPCUri) {
    const stargateProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [
      ...cosmosProtoRegistry,
      ...ibcProtoRegistry,
      ...regenProtoRegistry,
    ];

    const cosmWasmProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [
      ...stargateProtoRegistry,
      ...wasmTypes,
    ];

    const aminoConverters = {
      ...cosmosAminoConverters,
      ...ibcAminoConverters,
      ...regenAminoConverters,
      ...createWasmAminoConverters(),
    } as const;

    const stargateRegistry = new Registry(stargateProtoRegistry);
    const cosmWasmRegistry = new Registry(cosmWasmProtoRegistry);
    const aminoTypes = new AminoTypes(aminoConverters);

    setLoading(true);
    try {
      const gasPrice = GasPrice.fromString('0.025uregen');

      const options: StargateConnectOptions = {
        registry: stargateRegistry,
        aminoTypes,
        gasPrice,
      } as unknown as StargateConnectOptions;

      const signingClient = await SigningStargateClient.connectWithSigner(
        ledgerRPCUri,
        signer as unknown as StargateOfflineSigner,
        options,
      );
      const cosmWasmOptions: CosmWasmConnectOptions = {
        registry: cosmWasmRegistry,
        aminoTypes,
        gasPrice,
      };
      const signingCosmWasmClient =
        await SigningCosmWasmClient.connectWithSigner(
          ledgerRPCUri,
          signer as unknown as CosmWasmOfflineSigner,
          cosmWasmOptions,
        );
      setSigningClient(signingClient);
      setSigningCosmWasmClient(signingCosmWasmClient);
      setLoading(false);
    } catch (e) {
      setSigningClient(undefined);
      setSigningCosmWasmClient(undefined);
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
  const [signingCosmWasmClient, setSigningCosmWasmClient] = useState<
    SigningCosmWasmClient | undefined
  >();
  const [queryClient, setQueryClient] = useState<QueryClient | undefined>();
  const [loadingSigningClient, setLoadingSigningClient] =
    useState<boolean>(false);
  const [loadingQueryClient, setLoadingQueryClient] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    if (wallet?.offlineSigner && (!signingClient || !signingCosmWasmClient))
      setupSigningClient(
        setSigningClient,
        setSigningCosmWasmClient,
        setLoadingSigningClient,
        setError,
        wallet?.offlineSigner,
      );
  }, [wallet?.offlineSigner, signingClient, signingCosmWasmClient]);

  useEffect(() => {
    setupRPCQueryClient(setQueryClient, setLoadingQueryClient, setError);
  }, []);

  return (
    <LedgerContext.Provider
      value={{
        error,
        loading: loadingSigningClient || loadingQueryClient,
        signingClient,
        signingCosmWasmClient,
        queryClient,
      }}
    >
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = (options?: ConnectParams): ContextValue =>
  React.useContext(LedgerContext);
