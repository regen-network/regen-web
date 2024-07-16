import { QueryClientImpl } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { connect as connectToApi } from 'lib/clients/ledger';

// Light ecocredit client without signer, to be used in route loaders
export const getEcocreditQueryClient = async (): Promise<QueryClientImpl> => {
  const api = await connectToApi();
  if (!api || !api?.queryClient) return Promise.reject();
  return new QueryClientImpl(api.queryClient);
};
