import { GET_TXS_EVENT_KEY } from './getTxsEventQuery.constants';
import { ReactQueryGetTxsEventProps } from './getTxsEventQuery.types';

type GetTxsEventQueryKeyParams = {
  request: ReactQueryGetTxsEventProps['request'];
};
export const getTxsEventQueryKey = ({ request }: GetTxsEventQueryKeyParams) => [
  GET_TXS_EVENT_KEY,
  request.query,
  String(request.page),
  String(request.limit),
  request.orderBy,
];
