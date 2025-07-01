import { ibc, regen } from '@regen-network/api';

import { ledgerRPCUri } from 'lib/ledger';

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
