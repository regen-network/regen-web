import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import {
  DEFAULT_TOKEN_ERROR,
  EMAIL_ADDED,
  TOKEN_ERROR_MSGS,
} from '../Dashboard.constants';

export const useVerifyToken = () => {
  const { _ } = useLingui();
  const [searchParams] = useSearchParams();
  const emailConfirmationToken = searchParams.get('token');
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: csrfToken } = useQuery(getCsrfTokenQuery({}));
  const setBannerText = useSetAtom(bannerTextAtom);
  const setErrorBannerText = useSetAtom(errorBannerTextAtom);
  const reactQueryClient = useQueryClient();
  const { privActiveAccount } = useAuth();

  const verifyToken = useCallback(
    async ({
      emailConfirmationToken,
      csrfToken,
    }: {
      emailConfirmationToken: string;
      csrfToken: string;
    }) => {
      try {
        const response: { error?: string } = await postData({
          url: `${apiServerUrl}/marketplace/v1/auth/email/verify-token`,
          method: 'POST',
          data: { token: emailConfirmationToken },
          token: csrfToken,
          retryCsrfRequest,
          onSuccess: async res => {
            await reactQueryClient.invalidateQueries({
              queryKey: [GET_ACCOUNTS_QUERY_KEY],
            });
            setBannerText(_(EMAIL_ADDED));
          },
        });
        if (response.error) {
          const errorText =
            TOKEN_ERROR_MSGS[response.error] ?? _(DEFAULT_TOKEN_ERROR);
          setErrorBannerText(_(errorText));
        }
      } catch (e) {
        setErrorBannerText(_(DEFAULT_TOKEN_ERROR));
      }
    },
    [_, reactQueryClient, retryCsrfRequest, setBannerText, setErrorBannerText],
  );

  useEffect(() => {
    if (emailConfirmationToken && csrfToken && !privActiveAccount?.email) {
      verifyToken({ emailConfirmationToken, csrfToken });
    }
  }, [
    csrfToken,
    emailConfirmationToken,
    privActiveAccount?.email,
    verifyToken,
  ]);
};
