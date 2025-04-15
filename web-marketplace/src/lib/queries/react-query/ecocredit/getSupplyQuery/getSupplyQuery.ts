import { queryEcoBatchSupply } from 'lib/ecocredit/api';

import {
  ReactQuerySupplyProps,
  ReactQuerySupplyResponse,
} from './getSupplyQuery.types';

export const getSupplyQuery = ({
  request,
  client,
  ...params
}: ReactQuerySupplyProps): ReactQuerySupplyResponse => ({
  queryKey: ['supply', request.batchDenom],
  queryFn: async () => {
    if (!client) return null;
    return await queryEcoBatchSupply(request.batchDenom ?? '', client);
  },
  ...params,
});
