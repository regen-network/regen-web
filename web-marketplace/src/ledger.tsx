import React, { useEffect, useState } from 'react';
import { OfflineSigner, Registry } from '@cosmjs/proto-signing';
import { AminoTypes, SigningStargateClient } from '@cosmjs/stargate';
import {
  cosmosAminoConverters,
  // cosmosProtoRegistry,
  // ibc,
  // ibcAminoConverters,
  // ibcProtoRegistry,
  // regen,
  // regenAminoConverters,
  // regenProtoRegistry,
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

export async function setupSigningClient(
  setSigningClient: UseStateSetter<SigningStargateClient | undefined>,
  setLoading: UseStateSetter<boolean>,
  setError: UseStateSetter<unknown>,
  signer: OfflineSigner,
) {
  if (chain && ledgerRPCUri) {
    const protoRegistry = [
      ...cosmosProtoRegistry,
      ...ibcProtoRegistry,
      ...regenProtoRegistry,
    ];

    const aminoConverters = {
      ...cosmosAminoConverters,
      ...ibcAminoConverters,
      ...regenAminoConverters,
    };

    const registry = new Registry(protoRegistry);
    const aminoTypes = new AminoTypes(aminoConverters);

    setLoading(true);
    try {
      const signingClient = await SigningStargateClient.connectWithSigner(
        ledgerRPCUri,
        signer,
        {
          registry,
          aminoTypes,
        },
      );
      setSigningClient(signingClient);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }
}

export async function getRPCQueryClient() {
  const { createRPCQueryClient } = regen.ClientFactory;
  const client = await createRPCQueryClient({
    rpcEndpoint: ledgerRPCUri,
  });

  const { createRPCQueryClient: createRPCQueryIBClient } = ibc.ClientFactory;
  const ibcClient = await createRPCQueryIBClient({
    rpcEndpoint: ledgerRPCUri,
  });

  return { ...ibcClient, ...client };
}

async function setupRPCQueryClient(
  setQueryClient: UseStateSetter<QueryClient | undefined>,
  setLoading: UseStateSetter<boolean>,
  setError: UseStateSetter<unknown>,
) {
  if (ledgerRPCUri) {
    setLoading(true);
    try {
      const queryClient = await getRPCQueryClient();
      setQueryClient(queryClient);
      setLoading(false);
    } catch (e) {
      setError(e);
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
