import React, { useState, useEffect } from 'react';
import { RegenApi } from '@regen-network/api';

import getApiUri from './lib/apiUri';

export type ContextType = {
  loading: boolean;
  api: RegenApi | undefined;
  error: Error | undefined;
};

async function connect(): Promise<RegenApi | undefined> {
  // Create a new instance of the RegenApi class.
  const api = await RegenApi.connect({
    // RegenApi supports multiple client connections to interact with a node:
    // - via the Tendermint RPC
    // - via gRPC
    // - via gRPC-web
    // - via REST and gRPC-gateway
    connection: {
      // Here, we are using the Tendermint RPC client connection.
      type: 'tendermint',
      url: `${getApiUri()}/ledger`,
    },
  });
  return api;
}

const LedgerContext = React.createContext<ContextType>({ loading: false, api: undefined, error: undefined });

export const LedgerProvider: React.FC = ({ children }) => {
  const [api, setApi] = useState<RegenApi | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

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

  return <LedgerContext.Provider value={{ error, loading, api }}>{children}</LedgerContext.Provider>;
};

export const useLedger = (): ContextType => React.useContext(LedgerContext);
