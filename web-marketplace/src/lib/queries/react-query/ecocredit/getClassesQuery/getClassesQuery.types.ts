import {
  DeepPartial,
  QueryClassesRequest,
  QueryClassesResponse,
  QueryClientImpl as EcocreditQueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryClassesResponse =
  QueryObserverOptions<QueryClassesResponse | null>;

export type ReactQueryClassesProps = {
  request?: DeepPartial<QueryClassesRequest>;
} & {
  client?: EcocreditQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryClassesResponse>;
