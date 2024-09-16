import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import { apiUri } from 'lib/apiUri';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { GET_POST_QUERY_KEY } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.constants';
import { getPostsQueryKey } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.utils';

import { POST_IS_DELETED } from '../Post.constants';

type Params = {
  iri?: string;
  offChainProjectId?: string;
  projectHref?: string;
};

export const useDelete = ({ iri, offChainProjectId, projectHref }: Params) => {
  const { _ } = useLingui();
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
  const navigate = useNavigate();

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
          onSuccess: async () => {
            if (offChainProjectId) {
              await reactQueryClient.invalidateQueries({
                queryKey: getPostsQueryKey({ projectId: offChainProjectId }),
                refetchType: 'all',
              });
            }
            await reactQueryClient.invalidateQueries({
              queryKey: [GET_POST_QUERY_KEY, iri],
              // Only mark query as invalid without refetching.
              // Otherwise, if deleting a post from the post page itself,
              // 404 would be shown before navigating to project data stream section.
              refetchType: 'none',
            });
            setBannerText(_(POST_IS_DELETED));
            if (projectHref) navigate(`${projectHref}#data-stream`);
          },
        });
      } catch (e) {
        setErrorBannerTextAtom(String(e));
      }
    }
  }, [
    _,
    iri,
    navigate,
    offChainProjectId,
    projectHref,
    reactQueryClient,
    retryCsrfRequest,
    setBannerText,
    setErrorBannerTextAtom,
    token,
  ]);

  return { deletePost, open, onClose, onOpen };
};
