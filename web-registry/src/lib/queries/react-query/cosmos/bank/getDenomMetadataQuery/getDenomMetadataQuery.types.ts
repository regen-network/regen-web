import {
  DeepPartial,
  QueryClientImpl as BankQueryClientImpl,
  QueryDenomMetadataRequest,
  QueryDenomMetadataResponse,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryDenomMetadataResponse =
  QueryObserverOptions<QueryDenomMetadataResponse | null>;

export type ReactQueryDenomMetadataProps = {
  request: DeepPartial<QueryDenomMetadataRequest>;
} & {
  client?: BankQueryClientImpl;
} & ReactQueryBuilderResponse<ReactQueryDenomMetadataResponse>;
