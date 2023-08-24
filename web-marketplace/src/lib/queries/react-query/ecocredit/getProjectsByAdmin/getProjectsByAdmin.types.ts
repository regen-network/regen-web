import {
  DeepPartial,
  QueryClientImpl as EcocreditQueryClientImpl,
  QueryProjectsByAdminRequest,
  QueryProjectsByAdminResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryProjectsByAdminResponse =
  QueryObserverOptions<QueryProjectsByAdminResponse | null>;

export type ReactQueryProjectsByAdminProps = {
  request?: DeepPartial<QueryProjectsByAdminRequest>;
} & {
  client?: EcocreditQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryProjectsByAdminResponse>;
