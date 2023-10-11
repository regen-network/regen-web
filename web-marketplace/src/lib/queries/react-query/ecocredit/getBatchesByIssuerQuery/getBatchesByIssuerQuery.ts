import { queryBatchesByIssuer } from 'lib/ecocredit/api';

import { getBatchesByIssuerKey } from './getBatchesByIssuerQuery.constants';
import {
  ReactQueryBatchesByIssuerProps,
  ReactQueryBatchesByIssuerResponse,
} from './getBatchesByIssuerQuery.types';

export const getBatchesByIssuerQuery = ({
  client,
  request,
  ...params
}: ReactQueryBatchesByIssuerProps): ReactQueryBatchesByIssuerResponse => ({
  queryKey: getBatchesByIssuerKey({
    issuer: request.issuer ?? '',
    offset: String(request.pagination?.offset),
    limit: String(request.pagination?.limit),
  }),
  queryFn: async () => {
    if (!client) return;
    return await queryBatchesByIssuer({ client, request });
  },
  ...params,
});
