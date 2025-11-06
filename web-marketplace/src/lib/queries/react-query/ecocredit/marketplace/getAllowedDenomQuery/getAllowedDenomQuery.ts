import { keepPreviousData } from '@tanstack/react-query';

import {
  ReactQueryAllowedDenomProps,
  ReactQueryAllowedDenomResponse,
} from './getAllowedDenomQuery.types';

export const getAllowedDenomQuery = ({
  client,
  ...params
}: ReactQueryAllowedDenomProps): ReactQueryAllowedDenomResponse => ({
  queryKey: ['allowedDenom'],
  queryFn: async () => {
    if (!client) return undefined;
    return await client.regen.ecocredit.marketplace.v1.allowedDenoms({});
  },
  placeholderData: keepPreviousData,
  ...params,
});
