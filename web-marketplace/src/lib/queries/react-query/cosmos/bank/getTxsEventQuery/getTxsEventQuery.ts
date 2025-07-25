import { TxResponse } from '@regen-network/api/cosmos/base/abci/v1beta1/abci';
import {
  GetTxsEventRequest,
  GetTxsEventResponse,
  OrderBy,
} from '@regen-network/api/cosmos/tx/v1beta1/service';
import { Tx } from '@regen-network/api/cosmos/tx/v1beta1/tx';

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

    // Just use provided pagination
    if (request.page && request.limit)
      return await client.cosmos.tx.v1beta1.getTxsEvent(
        request as GetTxsEventRequest,
      );

    // Or loop through all the pages to get all txs
    let txs: Tx[] = [],
      txResponses: TxResponse[] = [];
    let response: GetTxsEventResponse | undefined;

    request.limit = 100n;
    request.orderBy = OrderBy.ORDER_BY_DESC;
    request.page = 1n;
    while (!response || (response.total && txs.length < response.total)) {
      response = await client.cosmos.tx.v1beta1.getTxsEvent(
        request as GetTxsEventRequest,
      );
      txs.push(...response.txs);
      txResponses.push(...response.txResponses);
      request.page = request.page + 1n;
    }
    return {
      txs,
      txResponses,
    };
  },
  ...params,
});
