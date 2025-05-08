import { queryParams } from 'lib/ecocredit/api';

import { getCreditClassCreatorKey } from './getCreditClassCreatorKey';
import {
  ReactQueryCreditClassCreatorProps,
  ReactQueryCreditClassCreatorResponse,
} from './getCreditClassCreatorQuery.types';

export const getCreditClassCreatorQuery = ({
  client,
  request,
  ...params
}: ReactQueryCreditClassCreatorProps): ReactQueryCreditClassCreatorResponse => ({
  queryKey: getCreditClassCreatorKey(request.activeAddress),
  enabled: !!request.activeAddress && !!client,
  queryFn: async () => {
    const { params: apiParams } = await queryParams({ client });
    if (!apiParams?.allowlistEnabled) {
      return true;
    }
    return apiParams.allowedClassCreators.includes(request.activeAddress!);
  },
  ...params,
});
