import { useCallback, useEffect, useRef, useState } from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import Modal from 'web-components/src/components/modal';
import { SaveChangesWarningModal } from 'web-components/src/components/modal/SaveChangesWarningModal/SaveChangesWarningModal';
import { Item } from 'web-components/src/components/modal/TxModal';
import { deleteImage } from 'web-components/src/utils/s3';

import { apiUri } from 'lib/apiUri';
import { txSuccessfulModalAtom } from 'lib/atoms/modals.atoms';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPostQuery } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery';
import { PostFile } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.types';
import { getPostsQueryKey } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.utils';

import { useHandleUpload } from '../MediaForm/hooks/useHandleUpload';
import { DEFAULT, PROJECTS_S3_PATH } from '../MediaForm/MediaForm.constants';
import PostForm from '../PostForm';
import { PostFormSchemaType } from '../PostForm/PostForm.schema';
import {
  basePostContent,
  FILE_NAMES,
  POST_CREATED,
  PROJECT,
  VIEW_ALL_POSTS,
} from './PostFlow.constants';

type Props = {
  onModalClose: () => void;
  initialValues?: PostFormSchemaType;
  projectLocation: GeocodeFeature;
  projectId: string;
  projectName?: string;
  projectSlug?: string | null;
  offChainProjectId?: string;
};

export const PostFlow = ({
  onModalClose,
  initialValues,
  projectLocation,
  projectId,
  projectName,
  projectSlug,
  offChainProjectId: _offChainProjectId,
}: Props) => {
  const fileNamesToDeleteRef = useRef<string[]>([]);
  const retryCsrfRequest = useRetryCsrfRequest();
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);
  const reactQueryClient = useQueryClient();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showOnCloseWarning, setShowOnCloseWarning] = useState(false);
  const [iri, setIri] = useState<string | undefined>();
  const { data: createdPostData } = useQuery(
    getPostQuery({
      iri,
      enabled: !!iri,
    }),
  );

  const [offChainProjectId, setOffChainProjectId] =
    useState(_offChainProjectId);
  const { handleUpload } = useHandleUpload({
    offChainProjectId,
    apiServerUrl: apiUri,
    setOffChainProjectId,
    subFolder: '/posts',
  });

  const onSubmit = useCallback(
    async (data: PostFormSchemaType) => {
      if (token) {
        const files = data.files?.filter(file => file.url !== DEFAULT);
        await postData({
          url: `${apiServerUrl}/marketplace/v1/posts`,
          data: {
            projectId: offChainProjectId,
            privacy: data.privacyType,
            contents: {
              ...basePostContent,
              title: data.title,
              comment: data.comment,
              files: files?.map(file => {
                const geocodePoint = file.location.geometry.coordinates;
                return {
                  iri: file.iri,
                  name: file.name,
                  description: file.description,
                  credit: file.credit,
                  locationType: file.locationType,
                  location: {
                    wkt: `POINT(${geocodePoint[0]} ${geocodePoint[1]})`,
                  },
                };
              }),
            },
          },
          token,
          retryCsrfRequest,
          onSuccess: async res => {
            setIri(res.iri);
            await reactQueryClient.invalidateQueries({
              queryKey: getPostsQueryKey({
                projectId: offChainProjectId,
              }),
              refetchType: 'all',
            });
          },
        });
      }
    },
    [token, offChainProjectId, retryCsrfRequest, reactQueryClient],
  );

  useEffect(() => {
    // TODO once data anchored, if activeAccount has an address
    // 1. query AnchorByIri based on res.iri
    // 2. sign MsgAttest with returned content hash from 1.
    // (pending https://github.com/regen-network/regen-server/pull/454)
    // else go directly to the confirmation popup
    if (iri && createdPostData) {
      const files = createdPostData?.contents?.files as PostFile[] | undefined;
      const filesUrls = createdPostData?.filesUrls;

      const projectUrl = `/project/${
        projectSlug ?? projectId ?? offChainProjectId
      }`;
      const cardItems: Item[] = [
        {
          label: PROJECT,
          value: {
            name: projectName ?? projectId ?? offChainProjectId,
            url: projectUrl,
          },
        },
      ];
      if (files && files.length && filesUrls && filesUrls.length) {
        cardItems.unshift({
          label: FILE_NAMES,
          value:
            files.map(file => ({
              name: file.name as string,
              url: filesUrls[file.iri],
            })) || [],
        });
      }
      // TODO add hash(es) cardItem
      // cardItems.push({label: HASH, value: []})

      onModalClose();
      setTxSuccessfulModalAtom(atom => {
        atom.open = true;
        atom.cardItems = cardItems;
        atom.title = POST_CREATED;
        // atom.cardTitle = ''; // TODO use 'Attest' if signed
        atom.buttonTitle = VIEW_ALL_POSTS;
        atom.buttonLink = `${projectUrl}#data-stream`;
      });
    }
  }, [
    createdPostData,
    iri,
    offChainProjectId,
    onModalClose,
    projectId,
    projectName,
    projectSlug,
    setTxSuccessfulModalAtom,
  ]);

  const onClose = useCallback(
    async (isFormDirty: boolean) => {
      if (isFormDirty) {
        setShowOnCloseWarning(true);
        return;
      }
      // Delete any files that were removed on S3
      await Promise.all(
        fileNamesToDeleteRef?.current.map(async (fileName): Promise<void> => {
          await deleteImage(
            PROJECTS_S3_PATH,
            offChainProjectId ?? '',
            fileName,
            apiServerUrl,
          );
        }),
      );
      fileNamesToDeleteRef.current = [];

      onModalClose();
    },
    [offChainProjectId, onModalClose],
  );

  return (
    <>
      <Modal open={!!projectId} onClose={() => onClose(isFormDirty)}>
        {projectId && (
          <PostForm
            offChainProjectId={offChainProjectId}
            initialValues={initialValues}
            projectLocation={projectLocation}
            onClose={() => onClose(isFormDirty)}
            onSubmit={onSubmit}
            fileNamesToDeleteRef={fileNamesToDeleteRef}
            handleUpload={handleUpload}
            onUpdateDirtyState={setIsFormDirty}
          />
        )}
      </Modal>
      <SaveChangesWarningModal
        open={showOnCloseWarning}
        onClose={() => setShowOnCloseWarning(false)}
        navigate={() => onClose(false)}
      />
    </>
  );
};
