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
    return await client.AllowedDenoms({});
  },
  keepPreviousData: true,
  ...params,
});
