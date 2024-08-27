import {
  DeepPartial,
  GetTxsEventRequest,
  GetTxsEventResponse,
  ServiceClientImpl as TxServiceClientImpl,
} from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type GetTxsEventQueryResponse = Pick<
  GetTxsEventResponse,
  'txs' | 'txResponses'
>;
export type ReactQueryGetTxsEventResponse =
  QueryObserverOptions<GetTxsEventQueryResponse | null>;

export type ReactQueryGetTxsEventProps = {
  request: DeepPartial<GetTxsEventRequest>;
} & {
  client?: TxServiceClientImpl;
} & ReactQueryBuilderResponse<ReactQueryGetTxsEventResponse>;
