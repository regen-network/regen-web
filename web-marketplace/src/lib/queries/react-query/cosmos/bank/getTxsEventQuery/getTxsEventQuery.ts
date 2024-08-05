import {
  ReactQueryGetTxsEventProps,
  ReactQueryGetTxsEventResponse,
} from './getTxsEventQuery.types';
import { getTxsEventQueryKey } from './getTxsEventQuery.utils';

export const getGetTxsEventQuery = ({
  client,
  request,
  ...params
}: ReactQueryGetTxsEventProps): ReactQueryGetTxsEventResponse => ({
  queryKey: getTxsEventQueryKey({ request }),
  queryFn: async () => {
    if (!client) return null;
    return await client.GetTxsEvent(request);
  },
  ...params,
});
