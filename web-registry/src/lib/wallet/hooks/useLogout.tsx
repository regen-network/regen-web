import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

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
        await fetch(`${apiUri}/web3auth/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'X-CSRF-TOKEN': token,
          },
        });
        await disconnect();
        setAccountId(undefined);
      }
    } catch (e) {
      setError(e);
    }
  }, [disconnect, token, setError, setAccountId]);

  return logout;
};
