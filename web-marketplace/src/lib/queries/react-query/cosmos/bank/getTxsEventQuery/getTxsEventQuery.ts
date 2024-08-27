import { TxResponse } from '@regen-network/api/lib/generated/cosmos/base/abci/v1beta1/abci';
import { GetTxsEventResponse } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import { Tx } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/tx';

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
    if (request.pagination || request.page)
      return await client.GetTxsEvent(request);

    // Or loop through all the pages to get all txs
    let txs: Tx[] = [],
      txResponses: TxResponse[] = [];
    let response: GetTxsEventResponse | undefined;

    request.page = 1;
    while (!response || (response.total && txs.length < response.total.low)) {
      response = await client.GetTxsEvent(request);
      txs.push(...response.txs);
      txResponses.push(...response.txResponses);
      request.page = (request.page as number) + 1;
    }
    return {
      txs,
      txResponses,
    };
  },
  ...params,
});
