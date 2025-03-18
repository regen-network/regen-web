import {
  QueryClassIssuersRequest,
  QueryClassIssuersResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryClassIssuersResponse =
  QueryObserverOptions<QueryClassIssuersResponse | null>;

export type ReactQueryClassIssuerProps = {
  request: QueryClassIssuersRequest;
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryClassIssuersResponse>;
