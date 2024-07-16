import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { CSRF_ERROR } from 'lib/errors/apiErrors';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

type Params = {
  setError: UseStateSetter<unknown>;
};

export const useLogout = ({ setError }: Params) => {
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const reactQueryClient = useQueryClient();
  const retryCsrfRequest = useRetryCsrfRequest();

  const logout = useCallback(async (): Promise<void> => {
    try {
      if (token) {
        const logoutFn = async (csrfToken: string) => {
          const response = await fetch(
            `${apiUri}/marketplace/v1/wallet-auth/logout`,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'X-CSRF-TOKEN': csrfToken,
              },
            },
          );
          const bodyResponse = await response.json();
          if (!bodyResponse.error) {
            reactQueryClient.invalidateQueries({
              queryKey: [GET_ACCOUNTS_QUERY_KEY],
            });
          }

          return bodyResponse;
        };

        const bodyResponse = await logoutFn(token);

        if (bodyResponse.error === CSRF_ERROR) {
          retryCsrfRequest(logoutFn);
        }
      }
    } catch (e) {
      setError(e);
    }
  }, [token, reactQueryClient, retryCsrfRequest, setError]);

  return logout;
};
