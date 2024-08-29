import { useCallback } from 'react';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import copyTextToClipboard from 'web-components/src/utils/copy';

import { apiUri } from 'lib/apiUri';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { COPY_SUCCESS } from 'lib/constants/shared.constants';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';

type Params = {
  iri?: string;
};

export const useSharePrivateLink = ({ iri }: Params) => {
  const { _ } = useLingui();
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const setBannerText = useSetAtom(bannerTextAtom);

  const sharePrivateLink = useCallback(async () => {
    if (token && iri) {
      try {
        await postData({
          url: `${apiUri}/marketplace/v1/posts/${iri}/token`,
          token,
          retryCsrfRequest,
          onSuccess: async response => {
            const token = response.token;
            await copyTextToClipboard(
              `${window.location.origin}/post/${iri}?token=${token}`,
            );
            setBannerText(_(COPY_SUCCESS));
          },
        });
      } catch (e) {
        setErrorBannerTextAtom(String(e));
      }
    }
  }, [_, iri, retryCsrfRequest, setBannerText, setErrorBannerTextAtom, token]);
  return sharePrivateLink;
};
