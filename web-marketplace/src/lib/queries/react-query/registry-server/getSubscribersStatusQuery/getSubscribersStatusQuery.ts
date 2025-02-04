import { apiUri } from 'lib/apiUri';

import { GET_SUBSCRIBERS_STATUS_QUERY_KEY } from './getSubscribersStatusQuery.constants';
import {
  ReactQueryGetSubscribersStatusQueryParams,
  ReactQueryGetSubscribersStatusQueryResponse,
} from './getSubscribersStatusQuery.types';

export const getSubscribersStatusQuery = ({
  ...params
}: ReactQueryGetSubscribersStatusQueryParams): ReactQueryGetSubscribersStatusQueryResponse => ({
  queryKey: [GET_SUBSCRIBERS_STATUS_QUERY_KEY],
  queryFn: async () => {
    try {
      const resp = await fetch(`${apiUri}/subscribers/v1/status`, {
        method: 'GET',
        credentials: 'include',
      });
      return await resp.json();
    } catch (e) {
      return null;
    }
  },
  ...params,
});
