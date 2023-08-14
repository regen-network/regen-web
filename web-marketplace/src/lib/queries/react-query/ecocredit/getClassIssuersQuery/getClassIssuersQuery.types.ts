import {
  DeepPartial,
  QueryClassIssuersRequest,
  QueryClassIssuersResponse,
  QueryClientImpl as EcocreditQueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryClassIssuersResponse =
  QueryObserverOptions<QueryClassIssuersResponse | null>;

export type ReactQueryClassIssuerProps = {
  request: DeepPartial<QueryClassIssuersRequest>;
} & {
  client?: EcocreditQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryClassIssuersResponse>;
