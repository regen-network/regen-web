import { QueryClientImpl } from '@regen-network/api/lib/generated/ibc/applications/transfer/v1/query';

import { connect as connectToApi } from 'lib/clients/ledger';

export const getTransferQueryClient = async (): Promise<QueryClientImpl> => {
  const api = await connectToApi();
  if (!api || !api?.queryClient) return Promise.reject();
  return new QueryClientImpl(api.queryClient);
};
