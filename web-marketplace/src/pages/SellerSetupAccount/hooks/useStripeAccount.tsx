import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { apiUri } from 'lib/apiUri';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import useMsgClient from 'hooks/useMsgClient';

const useStripeAccount = () => {
  const { activeAccount } = useAuth();
  const { signAndBroadcast } = useMsgClient();
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const setupAccount = useCallback(async () => {
    if (activeAccount?.addr && token) {
      await postData({
        url: `${apiUri}/marketplace/v1/stripe/accounts`,
        token,
        retryCsrfRequest,
        onSuccess: async response => {
          console.log(response);
        },
      });

      // await signAndBroadcast(
      //   {
      //     msgs: [
      //       cosmos.authz.v1beta1.MessageComposer.withTypeUrl.grant({
      //         granter: activeAccount?.addr,
      //         grantee: import.meta.env.REGEN_WORKER_ADDRESS,
      //       }),
      //     ],
      //   },
      //   (): void => {
      //     setProcessingModalAtom(atom => void (atom.open = true));
      //   },
      //   {
      //     onError: async (error?: Error) => {
      //       setProcessingModalAtom(atom => void (atom.open = false));
      //     },
      //     onSuccess: async (deliverTxResponse?: DeliverTxResponse) => {
      //       setProcessingModalAtom(atom => void (atom.open = false));
      //     },
      //   },
      // );
    }
  }, [activeAccount?.addr, retryCsrfRequest, token]);

  const openLoginLink = useCallback(async () => {
    if (token)
      await postData({
        url: `${apiUri}/marketplace/v1/stripe/login-link`,
        token,
        retryCsrfRequest,
        onSuccess: async response => {
          console.log(response);
          window.open(response.url);
        },
      });
  }, [retryCsrfRequest, token]);

  return { setupAccount, openLoginLink };
};

export { useStripeAccount };
