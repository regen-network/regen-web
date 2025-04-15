import {
  QueryCreditTypeRequest,
  QueryCreditTypeResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryCreditTypeResponse =
  QueryObserverOptions<QueryCreditTypeResponse | null>;

export type ReactQueryCreditTypeProps = {
  request: QueryCreditTypeRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryCreditTypeResponse>;
