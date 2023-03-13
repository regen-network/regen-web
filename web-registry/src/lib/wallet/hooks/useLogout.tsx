import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { getAxiosInstance } from '../wallet.utils';
import { DisconnectType } from './useDisconnect';

type Params = {
  disconnect?: DisconnectType;
  setError: UseStateSetter<unknown>;
  setAccountId: UseStateSetter<string | undefined>;
};

export const useLogout = ({ disconnect, setError, setAccountId }: Params) => {
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const logout = useCallback(async (): Promise<void> => {
    try {
      if (disconnect && token) {
        await getAxiosInstance(token).post(`/web3auth/logout`);
        await disconnect();
        setAccountId(undefined);
      }
    } catch (e) {
      setError(e);
    }
  }, [disconnect, token, setError, setAccountId]);

  return logout;
};
