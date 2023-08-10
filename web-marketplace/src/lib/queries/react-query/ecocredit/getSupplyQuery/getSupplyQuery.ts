import { queryEcoBatchSupply } from 'lib/ecocredit/api';

import {
  ReactQuerySupplyProps,
  ReactQuerySupplyResponse,
} from './getSupplyQuery.types';

export const getSupplyQuery = ({
  request,
  ...params
}: ReactQuerySupplyProps): ReactQuerySupplyResponse => ({
  queryKey: ['supply', request.batchDenom],
  queryFn: async () => {
    return await queryEcoBatchSupply(request.batchDenom ?? '');
  },
  ...params,
});
