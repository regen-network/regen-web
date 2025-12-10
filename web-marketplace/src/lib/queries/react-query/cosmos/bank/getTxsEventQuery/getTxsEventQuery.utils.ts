import { GET_TXS_EVENT_KEY } from './getTxsEventQuery.constants';
import { ReactQueryGetTxsEventProps } from './getTxsEventQuery.types';

type GetTxsEventQueryKeyParams = {
  request: ReactQueryGetTxsEventProps['request'];
  stopConditionKey?: ReactQueryGetTxsEventProps['stopConditionKey'];
};
export const getTxsEventQueryKey = ({
  request,
  stopConditionKey,
}: GetTxsEventQueryKeyParams) => [
  GET_TXS_EVENT_KEY,
  request.query,
  String(request.page),
  String(request.limit),
  request.orderBy,
  stopConditionKey ?? '',
];
