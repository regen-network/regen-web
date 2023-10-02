import {
  DeepPartial,
  QueryClassesByAdminRequest,
  QueryClassesByAdminResponse,
  QueryClientImpl as EcocreditQueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryClassesByAdminResponse =
  QueryObserverOptions<QueryClassesByAdminResponse | null>;

export type ReactQueryClassesByAdminProps = {
  request?: DeepPartial<QueryClassesByAdminRequest>;
} & {
  client?: EcocreditQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryClassesByAdminResponse>;
