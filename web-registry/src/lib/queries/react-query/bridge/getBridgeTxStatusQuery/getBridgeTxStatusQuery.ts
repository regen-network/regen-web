import { getBridgeTxStatus } from 'lib/bridge';

import { BRIDGE_TX_STATUS_QUERY_KEY } from './getBridgeTxStatusQuery.constants';
import {
  ReactQueryBridgeTxStatusParams,
  ReactQueryBridgeTxStatusResponse,
} from './getBridgeTxStatusQuery.types';

export const getBridgeTxStatusQuery = ({
  request,
  ...params
}: ReactQueryBridgeTxStatusParams): ReactQueryBridgeTxStatusResponse => ({
  queryKey: [BRIDGE_TX_STATUS_QUERY_KEY, request?.txHash],
  queryFn: async () => {
    try {
      return await getBridgeTxStatus(request?.txHash);
    } catch (error) {
      return null;
    }
  },
  ...params,
});
