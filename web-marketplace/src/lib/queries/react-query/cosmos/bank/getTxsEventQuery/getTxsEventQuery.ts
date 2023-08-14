import { GET_TXS_EVENT_KEY } from './getTxsEventQuery.constants';
import {
  ReactQueryGetTxsEventProps,
  ReactQueryGetTxsEventResponse,
} from './getTxsEventQuery.types';
import { getEventsKey } from './getTxsEventQuery.utils';

export const getGetTxsEventQuery = ({
  client,
  request,
  ...params
}: ReactQueryGetTxsEventProps): ReactQueryGetTxsEventResponse => ({
  queryKey: [
    GET_TXS_EVENT_KEY,
    getEventsKey(request.events),
    String(request.pagination?.offset),
    String(request.pagination?.limit),
    request.orderBy,
  ],
  queryFn: async () => {
    if (!client) return null;
    return await client.GetTxsEvent(request);
  },
  ...params,
});
