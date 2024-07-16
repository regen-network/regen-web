import {
  DeepPartial,
  QueryClassRequest,
  QueryClassResponse,
  QueryClientImpl as EcocreditQueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryClassResponse =
  QueryObserverOptions<QueryClassResponse | null>;

export type ReactQueryClassProps = {
  request: DeepPartial<QueryClassRequest>;
} & {
  client?: EcocreditQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryClassResponse>;
