import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

type Params = {
  setError: UseStateSetter<unknown>;
  setAccountId: UseStateSetter<string | undefined>;
};

export const useLogout = ({ setError, setAccountId }: Params) => {
  const { data: token } = useQuery(getCsrfTokenQuery({}));
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
        setAccountId(undefined);
      }
    } catch (e) {
      setError(e);
    }
  }, [token, setError, setAccountId]);

  return logout;
};
