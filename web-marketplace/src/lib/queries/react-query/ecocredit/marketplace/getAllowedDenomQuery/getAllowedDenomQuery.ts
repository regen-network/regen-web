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
  keepPreviousData: true,
  ...params,
});
