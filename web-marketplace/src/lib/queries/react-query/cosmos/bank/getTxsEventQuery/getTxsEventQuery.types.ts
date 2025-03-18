import {
  GetTxsEventRequest,
  GetTxsEventResponse,
} from '@regen-network/api/cosmos/tx/v1beta1/service';
import { QueryObserverOptions } from '@tanstack/react-query';

import { QueryClient } from 'ledger';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type GetTxsEventQueryResponse = Pick<
  GetTxsEventResponse,
  'txs' | 'txResponses'
>;
export type ReactQueryGetTxsEventResponse =
  QueryObserverOptions<GetTxsEventQueryResponse | null>;

export type ReactQueryGetTxsEventProps = {
  request: GetTxsEventRequest;
} & {
  client?: QueryClient;
} & ReactQueryBuilderResponse<ReactQueryGetTxsEventResponse>;
