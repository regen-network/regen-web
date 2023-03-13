import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { getAxiosInstance } from '../wallet.utils';

type Params = {
  setError: UseStateSetter<unknown>;
  setAccountId: UseStateSetter<string | undefined>;
};

export const useLogout = ({ setError, setAccountId }: Params) => {
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const logout = useCallback(async (): Promise<void> => {
    try {
      if (token) {
        const instance = getAxiosInstance(token);
        await instance.post(`/web3auth/logout`);
        setAccountId(undefined);
      }
    } catch (e) {
      setError(e);
    }
  }, [setError, setAccountId]);

  return logout;
};
