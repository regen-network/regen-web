import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { AccountEvent } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import { SocialProvider } from '../ProfileEdit.types';

export const useSocialProviders = () => {
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const reactQueryClient = useQueryClient();
  const retryCsrfRequest = useRetryCsrfRequest();
  const { track } = useTracker();
  const { activeAccount } = useAuth();

  const disconnect = useCallback(
    async (name: string, path: string) => {
      if (token)
        try {
          await postData({
            url: `${apiUri}${path}`,
            token,
            retryCsrfRequest,
            onSuccess: async () => {
              await track<AccountEvent>(`disconnect${name}`, {
                id: activeAccount?.id,
                account: activeAccount?.addr,
                date: new Date().toUTCString(),
              });
              await reactQueryClient.invalidateQueries({
                queryKey: [GET_ACCOUNTS_QUERY_KEY],
              });
            },
          });
        } catch (e) {
          setErrorBannerTextAtom(String(e));
        }
    },
    [
      token,
      retryCsrfRequest,
      track,
      activeAccount?.id,
      activeAccount?.addr,
      reactQueryClient,
      setErrorBannerTextAtom,
    ],
  );

  const socialProviders: SocialProvider[] = [
    {
      id: 'google',
      // eslint-disable-next-line lingui/no-unlocalized-strings
      name: 'Google',
      connect: async () => {
        await track<AccountEvent>('connectGoogle', {
          id: activeAccount?.id,
          account: activeAccount?.addr,
          date: new Date().toUTCString(),
        });
        window.location.href = `${apiUri}/marketplace/v1/auth/google/connect`;
      },
      disconnect: () =>
        // eslint-disable-next-line lingui/no-unlocalized-strings
        disconnect('Google', '/marketplace/v1/auth/google/disconnect'),
    },
  ];

  return socialProviders;
};
