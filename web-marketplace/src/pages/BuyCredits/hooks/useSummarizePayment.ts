import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

import { CardDetails } from '../BuyCredits.types';

export const useSummarizePayment = (
  setCardDetails: UseStateSetter<CardDetails | undefined>,
) => {
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const retryCsrfRequest = useRetryCsrfRequest();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const summarizePayment = useCallback(
    async (confirmationTokenId: string) => {
      try {
        if (token) {
          await postData({
            url: `${apiUri}/marketplace/v1/stripe/summarize-payment`,
            data: { confirmationTokenId },
            token,
            retryCsrfRequest,
            onSuccess: async res => {
              setCardDetails(res);
            },
          });
        }
      } catch (error) {
        setErrorBannerTextAtom(String(error));
      }
    },
    [retryCsrfRequest, setCardDetails, setErrorBannerTextAtom, token],
  );

  return summarizePayment;
};
