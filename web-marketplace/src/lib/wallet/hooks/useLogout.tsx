import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

type Params = {
  setError: UseStateSetter<unknown>;
};

export const useLogout = ({ setError }: Params) => {
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const reactQueryClient = useQueryClient();

  const logout = useCallback(async (): Promise<void> => {
    try {
      if (token) {
        await fetch(`${apiUri}/marketplace/v1/web3auth/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'X-CSRF-TOKEN': token,
          },
        });
        reactQueryClient.invalidateQueries({
          queryKey: [GET_ACCOUNTS_QUERY_KEY],
        });
      }
    } catch (e) {
      setError(e);
    }
  }, [token, reactQueryClient, setError]);

  return logout;
};
