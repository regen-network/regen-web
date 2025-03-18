import {
  ReactQueryCreditTypeProps,
  ReactQueryCreditTypeResponse,
} from './getCreditTypeQuery.types';
import { getCreditTypeQueryKey } from './getCreditTypeQuery.utils';

export const getCreditTypeQuery = ({
  client,
  request,
  ...params
}: ReactQueryCreditTypeProps): ReactQueryCreditTypeResponse => ({
  queryKey: getCreditTypeQueryKey({
    abbreviation: request.abbreviation,
  }),
  queryFn: async () => {
    if (!client) return null;
    return await client.regen.ecocredit.v1.creditType(request);
  },
  ...params,
});
