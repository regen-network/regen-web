import React, { useEffect, useState } from 'react';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { RegenApi } from '@regen-network/api';
import { QueryClientImpl as BankQueryClientImpl } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import { ServiceClientImpl as TxServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { QueryClientImpl as DataQueryClientImpl } from '@regen-network/api/lib/generated/regen/data/v1/query';
import { QueryClientImpl as BasketQueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { QueryClientImpl as MarketplaceQueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { QueryClientImpl as EcocreditQueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useInitClient } from 'lib/clients/hooks/useInitClient';
import { EcocreditQueryClient } from 'lib/ecocredit/api';
import { MarketplaceQueryClient } from 'lib/ecocredit/marketplace/marketplace.types';

import { ledgerRPCUri } from './lib/ledger';
import { useWallet, Wallet } from './lib/wallet/wallet';

interface ContextValue {
  loading: boolean;
  api: RegenApi | undefined;
  ecocreditClient?: EcocreditQueryClient;
  marketplaceClient?: MarketplaceQueryClient;
  basketClient?: BasketQueryClientImpl;
  dataClient?: DataQueryClientImpl;
  bankClient?: BankQueryClientImpl;
  txClient?: TxServiceClientImpl;
  error: unknown;
  wallet?: Wallet;
}

interface ConnectParams {
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
      endpoint: ledgerRPCUri,
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
  marketplaceClient: undefined,
  basketClient: undefined,
  dataClient: undefined,
  bankClient: undefined,
  txClient: undefined,
  error: undefined,
});

const getApi = async (
  setApi: React.Dispatch<React.SetStateAction<RegenApi | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<unknown>,
  signer?: OfflineSigner,
): Promise<void> => {
  try {
    const regenApi = await connect({ signer });
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
  const { wallet, loaded } = useWallet();

  useEffect(() => {
    if (loaded && !api)
      getApi(setApi, setLoading, setError, wallet?.offlineSigner);
  }, [loaded, api, setApi, setLoading, setError, wallet?.offlineSigner]);

  return (
    <LedgerContext.Provider value={{ error, loading, api, wallet }}>
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = (options?: ConnectParams): ContextValue => {
  const context = React.useContext(LedgerContext);
  const { wallet } = useWallet();
  const api = context.api;

  const ecocreditClient = useInitClient<EcocreditQueryClient>({
    ClientImpl: EcocreditQueryClientImpl,
    api,
  });
  const marketplaceClient = useInitClient<MarketplaceQueryClientImpl>({
    ClientImpl: MarketplaceQueryClientImpl,
    api,
  });
  const basketClient = useInitClient<BasketQueryClientImpl>({
    ClientImpl: BasketQueryClientImpl,
    api,
  });

  const dataClient = useInitClient<DataQueryClientImpl>({
    ClientImpl: DataQueryClientImpl,
    api,
  });

  const bankClient = useInitClient<BankQueryClientImpl>({
    ClientImpl: BankQueryClientImpl,
    api,
  });

  const txClient = useInitClient<TxServiceClientImpl>({
    ClientImpl: TxServiceClientImpl,
    api,
  });

  return {
    api,
    ecocreditClient,
    marketplaceClient,
    basketClient,
    dataClient,
    bankClient,
    txClient,
    loading: context.loading,
    error: context.error,
    wallet,
  };
};
