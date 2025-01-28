import { apiUri } from 'lib/apiUri';

import { GET_MAILERLITE_STATUS_QUERY_KEY } from './getMailerliteStatusQuery.constants';
import {
  ReactQueryGetMailerliteStatusQueryParams,
  ReactQueryGetMailerliteStatusQueryResponse,
} from './getMailerliteStatusQuery.types';

export const getMailerliteStatusQuery = ({
  ...params
}: ReactQueryGetMailerliteStatusQueryParams): ReactQueryGetMailerliteStatusQueryResponse => ({
  queryKey: [GET_MAILERLITE_STATUS_QUERY_KEY],
  queryFn: async () => {
    try {
      const resp = await fetch(`${apiUri}/website/v1/mailerlite/status`, {
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
