import React, { useState, useEffect } from 'react';
import { RegenApi } from '@regen-network/api';

import getApiUri from './lib/apiUri';
import { chainId } from './lib/wallet';

export type ContextType = {
  loading: boolean;
  api: RegenApi | undefined;
  error: unknown;
};

// Simple proxy endpoint for REST requests. We check for chainId as an on/off switch.
export const ledgerRestUri = chainId ? `${getApiUri()}/ledger-rest` : undefined;

async function connect(): Promise<RegenApi | undefined> {
  // Create a new instance of the RegenApi class.
  const api = RegenApi.connect({
    // RegenApi only supports using the Tendermint RPC to interact with a node for now.
    // But it may support other client connections in the future:
    // - via gRPC
    // - via gRPC-web
    // - via REST and gRPC-gateway
    connection: {
      type: 'tendermint',
      endpoint: `${getApiUri()}/ledger`,
      // TODO: DISABLED SIGNER
      // signer, // OfflineSigner from @cosmjs/proto-signing
    },
  });
  return api;
}

const LedgerContext = React.createContext<ContextType>({
  loading: false,
  api: undefined,
  error: undefined,
});

export const LedgerProvider: React.FC = ({ children }) => {
  const [api, setApi] = useState<RegenApi | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    const getApi = async (): Promise<void> => {
      setLoading(true);
      try {
        const regenApi = await connect();
        setApi(regenApi);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    getApi();
  }, []);

  return (
    <LedgerContext.Provider value={{ error, loading, api }}>
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = (): ContextType => React.useContext(LedgerContext);
