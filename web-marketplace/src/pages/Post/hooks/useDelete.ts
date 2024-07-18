import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { apiUri } from 'lib/apiUri';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { GET_POST_QUERY_KEY } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.constants';
import { GET_POSTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.constants';

import { POST_IS_DELETED } from '../Post.constants';

type Params = {
  iri?: string;
  offChainProjectId?: string;
  onDeleteSuccess?: () => void;
};

export const useDelete = ({
  iri,
  offChainProjectId,
  onDeleteSuccess,
}: Params) => {
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const setBannerText = useSetAtom(bannerTextAtom);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  const reactQueryClient = useQueryClient();

  const deletePost = useCallback(async () => {
    onClose();
    if (token && iri) {
      try {
        await postData({
          url: `${apiUri}/marketplace/v1/posts/${iri}`,
          method: 'DELETE',
          token,
          parseTextResponse: true,
          retryCsrfRequest,
          onSuccess: async _ => {
            setBannerText(POST_IS_DELETED);
            if (offChainProjectId)
              await reactQueryClient.invalidateQueries({
                queryKey: [GET_POSTS_QUERY_KEY, offChainProjectId],
              });
            await reactQueryClient.invalidateQueries({
              queryKey: [GET_POST_QUERY_KEY, iri],
            });
            onDeleteSuccess && onDeleteSuccess();
          },
        });
      } catch (e) {
        setErrorBannerTextAtom(String(e));
      }
    }
  }, [
    iri,
    offChainProjectId,
    onDeleteSuccess,
    reactQueryClient,
    retryCsrfRequest,
    setBannerText,
    setErrorBannerTextAtom,
    token,
  ]);

  return { deletePost, open, onClose, onOpen };
};
