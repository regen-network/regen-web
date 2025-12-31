import { QueryObserverOptions } from '@tanstack/react-query';

import { DenomWithHash, QueryDenomByHashesParams } from 'lib/ibc/transfer/api';
import { ReactQueryBuilderResponse } from 'lib/queries/react-query/types/react-query.types';

export type ReactQueryAddDataToBatchResponse = QueryObserverOptions<
  DenomWithHash[] | void
>;

export type ReactQueryDenomByHashesProps = QueryDenomByHashesParams &
  ReactQueryBuilderResponse<ReactQueryAddDataToBatchResponse>;
