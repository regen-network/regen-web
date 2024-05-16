import { useCallback } from 'react';
import { StdSignature } from '@cosmjs/launchpad';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postData } from 'utils/fetch/postData';

import { apiUri } from 'lib/apiUri';
import { useAuth } from 'lib/auth/auth';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

type UseMergeAccountsParams = {
  signature?: StdSignature;
};

export type MergeAccountsParams = {
  keepCurrentAccout: boolean;
};

export const useMergeAccounts = ({ signature }: UseMergeAccountsParams) => {
  const { activeAccountId } = useAuth();
  const { wallet } = useWallet();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const reactQueryClient = useQueryClient();
  const retryCsrfRequest = useRetryCsrfRequest();

  const mergeAccounts = useCallback(
    async ({ keepCurrentAccout }: MergeAccountsParams) => {
      try {
        if (token && wallet?.address) {
          const response = await postData({
            url: `${apiUri}/marketplace/v1/wallet-auth/merge-accounts`,
            data: { signature, keepCurrentAccout },
            token,
            retryCsrfRequest,
            onSuccess: async () => {
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountByAddrQueryKey({ addr: wallet?.address }),
              });
              await reactQueryClient.invalidateQueries({
                queryKey: getAccountByIdQueryKey({ id: activeAccountId }),
              });
            },
          });

          if (response.error) {
            throw Error(response.error);
          }
        }
      } catch (e) {}
    },
    [
      activeAccountId,
      reactQueryClient,
      retryCsrfRequest,
      signature,
      token,
      wallet?.address,
    ],
  );

  return mergeAccounts;
};
