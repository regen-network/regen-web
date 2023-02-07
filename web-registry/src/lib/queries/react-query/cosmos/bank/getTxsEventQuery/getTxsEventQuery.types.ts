import {
  DeepPartial,
  GetTxsEventRequest,
  GetTxsEventResponse,
  ServiceClientImpl as TxServiceClientImpl,
} from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { QueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../../types/react-query.types';

export type ReactQueryGetTxsEventResponse =
  QueryObserverOptions<GetTxsEventResponse | null>;

export type ReactQueryGetTxsEventProps = {
  request: DeepPartial<GetTxsEventRequest>;
} & {
  client?: TxServiceClientImpl;
} & ReactQueryBuilderResponse<ReactQueryGetTxsEventResponse>;
