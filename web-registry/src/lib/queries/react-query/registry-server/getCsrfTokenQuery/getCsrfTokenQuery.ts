import { apiUri } from 'lib/apiUri';

import {
  ReactQueryCsrfTokenProps,
  ReactQueryCsrfTokenResponse,
} from './getCsrfTokenQuery.types';

export const getCsrfTokenQuery = ({
  ...params
}: ReactQueryCsrfTokenProps): ReactQueryCsrfTokenResponse => ({
  queryKey: ['csrfToken'],
  queryFn: async () => {
    const resp = await fetch(`${apiUri}/csrfToken`, {
      method: 'GET',
      credentials: 'include',
    });
    const { token } = await resp.json();
    return token;
  },
  ...params,
});
