'use client';
import React, { useEffect, useState } from 'react';
import {
  createWasmAminoConverters,
  SigningCosmWasmClient,
  wasmTypes,
} from '@cosmjs/cosmwasm-stargate';
import { GeneratedType, OfflineSigner, Registry } from '@cosmjs/proto-signing';
import { AminoTypes, GasPrice } from '@cosmjs/stargate';
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
import { getRPCQueryClient } from 'app/makeRPCQueryClient';
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
  signingCosmWasmClient?: SigningCosmWasmClient;
  queryClient?: QueryClient;
  error: unknown;
}

interface ConnectParams {
  signer?: OfflineSigner;
}

const LedgerContext = React.createContext<ContextValue>({
  loading: false,
  signingCosmWasmClient: undefined,
  queryClient: undefined,
  error: undefined,
});

export const gasPrice = GasPrice.fromString('0.025uregen');

export async function setupSigningClient(
  setSigningCosmWasmClient: UseStateSetter<SigningCosmWasmClient | undefined>,
  setLoading: UseStateSetter<boolean>,
  setError: UseStateSetter<unknown>,
  signer: OfflineSigner,
): Promise<void> {
  if (chain && ledgerRPCUri) {
    const protoRegistry: ReadonlyArray<[string, GeneratedType]> = [
      ...cosmosProtoRegistry,
      ...ibcProtoRegistry,
      ...regenProtoRegistry,
      ...wasmTypes,
    ];

    const wasmAminoConverters = createWasmAminoConverters();
    const aminoConverters = {
      ...cosmosAminoConverters,
      ...ibcAminoConverters,
      ...regenAminoConverters,
      ...wasmAminoConverters,
    } as const;

    const registry = new Registry(protoRegistry);
    const aminoTypes = new AminoTypes(aminoConverters);

    setLoading(true);
    try {
      const options = {
        registry,
        aminoTypes,
        gasPrice,
      };
      const signingCosmWasmClient =
        await SigningCosmWasmClient.connectWithSigner(
          ledgerRPCUri,
          signer,
          options,
        );
      setSigningCosmWasmClient(signingCosmWasmClient);
      setLoading(false);
    } catch (e) {
      setSigningCosmWasmClient(undefined);
      setError(e as unknown);
      setLoading(false);
    }
  }
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
  const [signingCosmWasmClient, setSigningCosmWasmClient] = useState<
    SigningCosmWasmClient | undefined
  >();
  const [queryClient, setQueryClient] = useState<QueryClient | undefined>();
  const [loadingSigningClient, setLoadingSigningClient] =
    useState<boolean>(false);
  const [loadingQueryClient, setLoadingQueryClient] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    if (wallet?.offlineSigner && !signingCosmWasmClient)
      setupSigningClient(
        setSigningCosmWasmClient,
        setLoadingSigningClient,
        setError,
        wallet?.offlineSigner,
      );
  }, [wallet?.offlineSigner, signingCosmWasmClient]);

  useEffect(() => {
    setupRPCQueryClient(setQueryClient, setLoadingQueryClient, setError);
  }, []);

  return (
    <LedgerContext.Provider
      value={{
        error,
        loading: loadingSigningClient || loadingQueryClient,
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
