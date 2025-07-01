import { keepPreviousData } from '@tanstack/react-query';

import { queryBalances } from 'lib/ecocredit/api';

import {
  ReactQueryBalancesesProps,
  ReactQueryBalancesResponse,
} from './getBalancesQuery.types';
import { getBalancesQueryKey } from './getBalancesQuery.utils';

export const getBalancesQuery = ({
  client,
  request,
  ...params
}: ReactQueryBalancesesProps): ReactQueryBalancesResponse => ({
  queryKey: getBalancesQueryKey(
    request.address,
    request.pagination?.offset ? Number(request.pagination?.offset) : 0,
    request.pagination?.limit ? Number(request.pagination?.limit) : 0,
  ),
  queryFn: async () => {
    if (!client) return;
    return await queryBalances({ client, request });
  },
  placeholderData: keepPreviousData,
  ...params,
});
