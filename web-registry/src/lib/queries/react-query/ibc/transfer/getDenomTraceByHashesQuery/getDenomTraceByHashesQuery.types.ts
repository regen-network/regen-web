import { QueryObserverOptions } from '@tanstack/react-query';

import {
  DenomTraceWithHash,
  QueryDenomTraceByHashesParams,
} from 'lib/ibc/transfer/api';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryAddDataToBatchResponse = QueryObserverOptions<
  DenomTraceWithHash[] | void
>;

export type ReactQueryDenomTraceByHashesProps = QueryDenomTraceByHashesParams &
  ReactQueryBuilderResponse<ReactQueryAddDataToBatchResponse>;
