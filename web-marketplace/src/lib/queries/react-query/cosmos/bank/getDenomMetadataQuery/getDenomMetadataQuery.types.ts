import {
  QueryDenomMetadataRequest,
  QueryDenomMetadataResponse,
} from '@regen-network/api/cosmos/bank/v1beta1/query';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryDenomMetadataResponse =
  QueryObserverOptions<QueryDenomMetadataResponse | null>;

export type ReactQueryDenomMetadataProps = {
  request: QueryDenomMetadataRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryDenomMetadataResponse>;
