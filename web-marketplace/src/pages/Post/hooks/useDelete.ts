import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  navigateToProject?: boolean;
};

export const useDelete = ({
  iri,
  offChainProjectId,
  navigateToProject,
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
          onSuccess: async _ => {
            if (offChainProjectId) {
              await reactQueryClient.invalidateQueries({
                queryKey: getPostsQueryKey({ projectId: offChainProjectId }),
                refetchType: 'all',
              });
            }
            await reactQueryClient.invalidateQueries({
              queryKey: [GET_POST_QUERY_KEY, iri],
              // only mark query as invalid
              // otherwise, if deleting a post from the post page itself,
              // 404 would be shown before navigating to project data stream section
              refetchType: 'none',
            });
            setBannerText(POST_IS_DELETED);
            if (navigateToProject)
              navigate(`/project/${offChainProjectId}#data-stream`);
          },
        });
      } catch (e) {
        setErrorBannerTextAtom(String(e));
      }
    }
  }, [
    iri,
    navigate,
    offChainProjectId,
    reactQueryClient,
    retryCsrfRequest,
    setBannerText,
    setErrorBannerTextAtom,
    token,
  ]);

  return { deletePost, open, onClose, onOpen };
};
