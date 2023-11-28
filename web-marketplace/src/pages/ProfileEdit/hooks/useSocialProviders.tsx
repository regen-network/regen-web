import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { SocialProvider } from '../ProfileEdit.types';

export const useSocialProviders = () => {
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const reactQueryClient = useQueryClient();

  const disconnect = useCallback(
    async (path: string) => {
      if (token)
        try {
          await postData({
            url: `${apiUri}${path}`,
            token,
          });
          await reactQueryClient.invalidateQueries({
            queryKey: [GET_ACCOUNTS_QUERY_KEY],
          });
        } catch (e) {
          setErrorBannerTextAtom(String(e));
        }
    },
    [reactQueryClient, setErrorBannerTextAtom, token],
  );

  const socialProviders: SocialProvider[] = [
    {
      id: 'google',
      name: 'Google',
      connect: () => {
        window.location.href = `${apiUri}/marketplace/v1/auth/google/connect`;
      },
      disconnect: () => disconnect('/marketplace/v1/auth/google/disconnect'),
    },
  ];

  return socialProviders;
};
