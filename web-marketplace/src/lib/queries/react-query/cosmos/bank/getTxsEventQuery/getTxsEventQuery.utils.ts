import { GET_TXS_EVENT_KEY } from './getTxsEventQuery.constants';
import { ReactQueryGetTxsEventProps } from './getTxsEventQuery.types';

export const getEventsKey = (events?: string[]): string =>
  events?.join(',') ?? '';

type GetTxsEventQueryKeyParams = {
  request: ReactQueryGetTxsEventProps['request'];
};
export const getTxsEventQueryKey = ({ request }: GetTxsEventQueryKeyParams) => [
  GET_TXS_EVENT_KEY,
  getEventsKey(request.events),
  String(request.page),
  String(request.limit),
  request.orderBy,
];
