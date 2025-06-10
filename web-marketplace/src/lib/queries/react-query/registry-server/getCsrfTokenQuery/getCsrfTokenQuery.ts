import { apiUri } from 'lib/apiUri';

import { GET_CSRF_QUERY_KEY } from './getCsrfTokenQuery.constants';
import {
  ReactQueryCsrfTokenProps,
  ReactQueryCsrfTokenResponse,
} from './getCsrfTokenQuery.types';

export const getCsrfTokenQuery = ({
  ...params
}: ReactQueryCsrfTokenProps): ReactQueryCsrfTokenResponse => ({
  queryKey: [GET_CSRF_QUERY_KEY],
  queryFn: async () => {
    const resp = await fetch(`${apiUri}/marketplace/v1/csrfToken`, {
      method: 'GET',
      credentials: 'include',
    });
    const cookie = resp.headers.get('set-cookie');
    console.log('cookie', cookie);
    const { token } = await resp.json();
    return token;
  },
  ...params,
});
