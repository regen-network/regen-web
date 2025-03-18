import {
  QuerySupplyRequest,
  QuerySupplyResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQuerySupplyResponse =
  QueryObserverOptions<QuerySupplyResponse | null>;

export type ReactQuerySupplyProps = {
  request: QuerySupplyRequest;
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQuerySupplyResponse>;
