import { useCallback, useEffect, useRef, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { ContentHash_Graph } from '@regen-network/api/regen/data/v2/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { postData } from 'utils/fetch/postData';

import Modal from 'web-components/src/components/modal';
import { SaveChangesWarningModal } from 'web-components/src/components/modal/SaveChangesWarningModal/SaveChangesWarningModal';
import { UseStateSetter } from 'web-components/src/types/react/useState';
import { deleteImage } from 'web-components/src/utils/s3';

import { ProjectFieldsFragment } from 'generated/graphql';
import { apiUri } from 'lib/apiUri';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { processingModalAtom } from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import {
  DISCARD_CHANGES_BODY,
  DISCARD_CHANGES_BUTTON,
  DISCARD_CHANGES_TITLE,
} from 'lib/constants/shared.constants';
import { apiServerUrl } from 'lib/env';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPostQuery } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery';
import { GET_POST_QUERY_KEY } from 'lib/queries/react-query/registry-server/getPostQuery/getPostQuery.constants';
import { getPostsQueryKey } from 'lib/queries/react-query/registry-server/getPostsQuery/getPostsQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { useDaoOrganization } from 'hooks/useDaoOrganization';

import { useHandleUpload } from '../MediaForm/hooks/useHandleUpload';
import { DEFAULT, PROJECTS_S3_PATH } from '../MediaForm/MediaForm.constants';
import PostForm from '../PostForm';
import { PostFormSchemaType } from '../PostForm/PostForm.schema';
import { useFetchMsgAnchor } from './hooks/useFetchMsgAnchor';
import { useSign } from './hooks/useSign';
import {
  basePostContent,
  DRAFT_CREATED,
  DRAFT_SAVED,
} from './PostFlow.constants';
import { EditedDraftModal } from './PostFlow.EditedDraftModal';
import { SignModal } from './PostFlow.SignModal';

type Props = {
  onModalClose: () => void;
  initialValues?: PostFormSchemaType;
  projectLocation: GeocodeFeature;
  projectId: string;
  projectName?: string;
  projectSlug?: string | null;
  offChainProjectId?: string;
  setDraftPost?: UseStateSetter<Partial<PostFormSchemaType> | undefined>;
  disableScrollLock?: boolean;
  offChainProject?: ProjectFieldsFragment | null;
};

export const PostFlow = ({
  onModalClose,
  initialValues,
  projectLocation,
  projectId,
  projectName,
  projectSlug,
  offChainProjectId: _offChainProjectId,
  setDraftPost,
  disableScrollLock = false,
  offChainProject,
}: Props) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
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
  const userDao = useDaoOrganization();
  const [isFormModalOpen, setIsFormModalOpen] = useState(true);
  const [isDraftEditedModalOpen, setIsDraftEditedModalOpen] = useState(false);
  const [editedData, setEditedData] = useState<PostFormSchemaType | undefined>(
    undefined,
  );
  const [iri, setIri] = useState<string | undefined>();
  const { data: createdPostData, isFetching } = useQuery(
    getPostQuery({
      iri,
      languageCode: selectedLanguage,
      enabled: !!iri,
    }),
  );
  const { _ } = useLingui();
  const router = useRouter();

  const [offChainProjectId, setOffChainProjectId] =
    useState(_offChainProjectId);
  const { handleUpload } = useHandleUpload({
    offChainProjectId,
    apiServerUrl: apiUri,
    setOffChainProjectId,
    subFolder: '/posts',
  });
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const setBannerText = useSetAtom(bannerTextAtom);
  const draftPostIri = initialValues?.iri;
  const draftPostId = initialValues?.id;

  const saveDataPost = useCallback(
    async (data: PostFormSchemaType) => {
      if (token) {
        const files = data.files
          ?.filter(file => file.url !== DEFAULT)
          ?.map(file => {
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
          });
        try {
          await postData({
            url: `${apiServerUrl}/marketplace/v1/posts${
              data?.iri ? `/${data.iri}` : ''
            }`,
            method: data?.iri ? 'PUT' : 'POST',
            data: {
              projectId: offChainProjectId,
              privacy: data.privacyType,
              contents: {
                ...basePostContent,
                title: data.title,
                comment: data.comment,
                files,
              },
              published: data.published,
              canDownloadFiles: !data.disallowFileDownloads,
            },
            token,
            retryCsrfRequest,
            onSuccess: async res => {
              if (res.iri) {
                setIri(res.iri);
                await reactQueryClient.invalidateQueries({
                  queryKey: [GET_POST_QUERY_KEY, res.iri, ''],
                  refetchType: 'all',
                });
              }

              await reactQueryClient.invalidateQueries({
                queryKey: getPostsQueryKey({
                  projectId: offChainProjectId,
                  languageCode: selectedLanguage,
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
      selectedLanguage,
      setErrorBannerTextAtom,
    ],
  );

  const onSubmit = useCallback(
    async (data: PostFormSchemaType) => {
      // Check if draft post has been updated in the meantime
      if (draftPostId) {
        try {
          const resp = await fetch(
            `${apiUri}/marketplace/v1/posts/by-id/${draftPostId}`,
            {
              method: 'GET',
              credentials: 'include',
            },
          );
          if (resp.status !== 200) {
            throw new Error(
              _(msg`Cannot get existing post: ${resp.statusText}`),
            );
          }
          const existingPost: { iri: string; updatedAt: string } =
            await resp.json();
          if (new Date(existingPost.updatedAt) !== initialValues?.updatedAt) {
            // We need to overwrite iri in case it has changed
            setEditedData({ ...data, iri: existingPost.iri });
            setIsDraftEditedModalOpen(true);
            return;
          }
        } catch (e) {
          setErrorBannerTextAtom(String(e));
          return;
        }
      }
      await saveDataPost(data);
    },
    [
      saveDataPost,
      setErrorBannerTextAtom,
      draftPostId,
      initialValues?.updatedAt,
      _,
    ],
  );

  const fetchMsgAnchor = useFetchMsgAnchor({
    projectSlug,
    projectId,
    offChainProjectId,
    projectName,
    onModalClose,
  });

  const hasAddress =
    !!wallet?.address && activeAccount?.addr === wallet.address;

  useEffect(() => {
    if (iri && createdPostData && !isFetching) {
      setIsFormModalOpen(false);
      if (createdPostData.published) {
        if (hasAddress) {
          setIsSignModalOpen(true);
        } else {
          fetchMsgAnchor({ iri, createdPostData });
          onModalClose();
        }
      } else {
        setBannerText(draftPostIri ? _(DRAFT_SAVED) : _(DRAFT_CREATED));
        if (draftPostIri && setDraftPost) {
          setDraftPost(undefined);
        }
        onModalClose();
        router.push(
          `/project/${
            projectSlug ?? offChainProjectId ?? projectId
          }#data-stream`,
        );
      }
    }
  }, [
    _,
    createdPostData,
    draftPostIri,
    fetchMsgAnchor,
    hasAddress,
    initialValues?.iri,
    iri,
    isFetching,
    router,
    offChainProjectId,
    onModalClose,
    projectId,
    projectSlug,
    setBannerText,
    setDraftPost,
    setProcessingModalAtom,
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

      setDraftPost && setDraftPost(undefined);
      onModalClose();
    },
    [offChainProjectId, onModalClose, setDraftPost],
  );

  const sign = useSign({
    projectSlug,
    projectId,
    offChainProjectId,
    projectName,
    onModalClose,
    offChainProject,
  });

  return (
    <>
      <Modal
        open={!!projectId && isFormModalOpen}
        onClose={() => onClose(isFormDirty)}
        disableScrollLock={disableScrollLock}
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
        published={createdPostData?.published}
        hasAddress={hasAddress}
        isOrganizationProject={
          // Show selector if user is part of the project's organization or we're on the org dashboard
          !!offChainProject?.organizationProjectByProjectId?.organizationId &&
          userDao?.organizationByDaoAddress?.id ===
            offChainProject?.organizationProjectByProjectId?.organizationId
        }
        open={isSignModalOpen}
        onClose={() => {
          setIsSignModalOpen(false);
          if (iri) fetchMsgAnchor({ iri, createdPostData });
        }}
        handleSign={async (contentHash: ContentHash_Graph, signAs) => {
          if (iri) {
            setIsSignModalOpen(false);
            await sign({
              contentHash,
              iri,
              createdPostData,
              signAs,
            });
          }
        }}
      />
      <SaveChangesWarningModal
        open={showOnCloseWarning}
        onClose={() => setShowOnCloseWarning(false)}
        navigate={() => onClose(false)}
        title={_(DISCARD_CHANGES_TITLE)}
        bodyText={_(DISCARD_CHANGES_BODY)}
        buttonText={_(DISCARD_CHANGES_BUTTON)}
      />
      {editedData && (
        <EditedDraftModal
          open={isDraftEditedModalOpen}
          onCancel={() => setIsDraftEditedModalOpen(false)}
          onSubmit={async () => {
            setIsDraftEditedModalOpen(false);
            await saveDataPost(editedData);
          }}
          onClose={() => setIsDraftEditedModalOpen(false)}
        />
      )}
    </>
  );
};
