import { useCallback } from 'react';
import { StdSignature } from '@cosmjs/launchpad';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postData } from 'utils/fetch/postData';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import { apiUri } from 'lib/apiUri';
import { useAuth } from 'lib/auth/auth';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { getAccountProjectsByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

type UseMergeAccountsParams = {
  signature?: StdSignature;
  setError: UseStateSetter<unknown>;
};

export type MergeAccountsParams = {
  keepCurrentAccount: boolean;
};

export const useMergeAccounts = ({
  signature,
  setError,
}: UseMergeAccountsParams) => {
  const { activeAccountId } = useAuth();
  const { wallet } = useWallet();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const reactQueryClient = useQueryClient();
  const retryCsrfRequest = useRetryCsrfRequest();

  const mergeAccounts = useCallback(
    async ({ keepCurrentAccount }: MergeAccountsParams) => {
      try {
        if (token && wallet?.address) {
          const response = await postData({
            url: `${apiUri}/marketplace/v1/wallet-auth/merge-accounts`,
            data: { signature, keepCurrentAccount },
            token,
            retryCsrfRequest,
            onSuccess: async () => {
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountByAddrQueryKey({ addr: wallet?.address }),
              });
              await reactQueryClient.invalidateQueries({
                queryKey: [GET_ACCOUNTS_QUERY_KEY],
              });
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountProjectsByIdQueryKey({
                  id: activeAccountId,
                }),
              });
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountByIdQueryKey({ id: activeAccountId }),
              });
            },
          });

          if (response.error) {
            throw new Error(response.error);
          }
        }
      } catch (e) {
        setError(e);
      }
    },
    [
      activeAccountId,
      reactQueryClient,
      retryCsrfRequest,
      setError,
      signature,
      token,
      wallet?.address,
    ],
  );

  return mergeAccounts;
};
