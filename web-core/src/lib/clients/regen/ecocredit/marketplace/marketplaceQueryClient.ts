import { QueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { connect as connectToApi } from 'lib/clients/ledger';

// Light marketplace client without signer, to be used in route loaders
export const getMarketplaceQueryClient = async (): Promise<QueryClientImpl> => {
  const api = await connectToApi();
  if (!api || !api?.queryClient) return Promise.reject();
  return new QueryClientImpl(api.queryClient);
};
