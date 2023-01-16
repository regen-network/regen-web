import { queryBalance } from 'lib/ecocredit/api';

import { getBalanceQueryKey } from './getBalanceQuery.config';
import {
  ReactQueryBalanceProps,
  ReactQueryBalanceResponse,
} from './getBalanceQuery.types';

export const getBalanceQuery = ({
  client,
  request,
  ...params
}: ReactQueryBalanceProps): ReactQueryBalanceResponse => ({
  queryKey: getBalanceQueryKey({
    address: request.address ?? '',
    batchDenom: request.batchDenom ?? '',
  }),
  queryFn: async () => {
    if (!client) return null;
    return await queryBalance({ client, request });
  },
  ...params,
});
