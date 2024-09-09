import { useCallback, useEffect, useRef, useState } from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { ContentHash_Graph } from '@regen-network/api/lib/generated/regen/data/v1/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { postData } from 'utils/fetch/postData';

import Modal from 'web-components/src/components/modal';
import { SaveChangesWarningModal } from 'web-components/src/components/modal/SaveChangesWarningModal/SaveChangesWarningModal';
import { deleteImage } from 'web-components/src/utils/s3';

import { apiUri } from 'lib/apiUri';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPostQuery } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery';
import { getPostsQueryKey } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { useHandleUpload } from '../MediaForm/hooks/useHandleUpload';
import { DEFAULT, PROJECTS_S3_PATH } from '../MediaForm/MediaForm.constants';
import PostForm from '../PostForm';
import { PostFormSchemaType } from '../PostForm/PostForm.schema';
import { useFetchMsgAnchor } from './hooks/useFetchMsgAnchor';
import { useSign } from './hooks/useSign';
import { basePostContent } from './PostFlow.constants';
import { SignModal } from './PostFlow.SignModal';

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
  const setProcessingModalAtom = useSetAtom(processingModalAtom);
  const reactQueryClient = useQueryClient();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [showOnCloseWarning, setShowOnCloseWarning] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const { wallet } = useWallet();
  const { activeAccount } = useAuth();
  const [isFormModalOpen, setIsFormModalOpen] = useState(true);
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
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const onSubmit = useCallback(
    async (data: PostFormSchemaType) => {
      if (token) {
        const files = data.files?.filter(file => file.url !== DEFAULT);
        try {
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
        } catch (e) {
          setErrorBannerTextAtom(String(e));
        }
      }
    },
    [
      token,
      offChainProjectId,
      retryCsrfRequest,
      reactQueryClient,
      setErrorBannerTextAtom,
    ],
  );

  const fetchMsgAnchor = useFetchMsgAnchor({
    projectSlug,
    projectId,
    offChainProjectId,
    projectName,
  });

  useEffect(() => {
    if (iri && createdPostData) {
      setIsFormModalOpen(false);

      if (wallet?.address && activeAccount?.addr === wallet.address) {
        setIsSignModalOpen(true);
      } else {
        fetchMsgAnchor({ iri, createdPostData });
        onModalClose();
      }
    }
  }, [
    activeAccount?.addr,
    createdPostData,
    fetchMsgAnchor,
    iri,
    onModalClose,
    setProcessingModalAtom,
    wallet?.address,
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
  const sign = useSign({
    projectSlug,
    projectId,
    offChainProjectId,
    projectName,
    onModalClose,
  });

  return (
    <>
      <Modal
        open={!!projectId && isFormModalOpen}
        onClose={() => onClose(isFormDirty)}
      >
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
      <SignModal
        iri={iri}
        open={isSignModalOpen}
        onClose={() => {
          setIsSignModalOpen(false);
          if (iri) fetchMsgAnchor({ iri, createdPostData });
        }}
        handleSign={async (contentHash: ContentHash_Graph) => {
          if (iri) {
            setIsSignModalOpen(false);
            await sign({
              contentHash,
              iri,
              createdPostData,
            });
          }
        }}
      />
      <SaveChangesWarningModal
        open={showOnCloseWarning}
        onClose={() => setShowOnCloseWarning(false)}
        navigate={() => onClose(false)}
      />
    </>
  );
};
