import {
  QueryClassesRequest,
  QueryClassesResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryClassesResponse =
  QueryObserverOptions<QueryClassesResponse | null>;

export type ReactQueryClassesProps = {
  request?: QueryClassesRequest;
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryClassesResponse>;
