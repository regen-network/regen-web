import {
  DeepPartial,
  QueryClientImpl as EcocreditQueryClientImpl,
  QueryCreditTypeRequest,
  QueryCreditTypeResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';

export type ReactQueryCreditTypeResponse =
  QueryObserverOptions<QueryCreditTypeResponse | null>;

export type ReactQueryCreditTypeProps = {
  request: DeepPartial<QueryCreditTypeRequest>;
} & {
  client?: EcocreditQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryCreditTypeResponse>;
