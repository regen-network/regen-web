import React, { useState } from 'react';
import ReactPlayer from 'react-player/es6';
import { useNavigate, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { Box, Card, CardMedia, useMediaQuery, useTheme } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';

import ErrorBanner from 'web-components/src/components/banner/ErrorBanner';
import { ReviewCard } from 'web-components/src/components/cards/ReviewCard/ReviewCard';
import { ItemDisplay } from 'web-components/src/components/cards/ReviewCard/ReviewCard.ItemDisplay';
import { Photo } from 'web-components/src/components/cards/ReviewCard/ReviewCard.Photo';
import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/src/components/modal/TxErrorModal';

import { useAuth } from 'lib/auth/auth';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { PROJECTS_QUERY_KEY } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery.constants';
import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByIdKey } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery.constants';
import {
  getAnchoredProjectMetadata,
  getUnanchoredProjectMetadata,
  QUDT_UNIT_MAP,
  qudtUnit,
} from 'lib/rdf';

import { OMITTED_METADATA_KEYS } from 'pages/ProjectMetadata/ProjectMetadata.config';
import {
  STORY_LABEL,
  STORY_TITLE_LABEL,
  SUMMARY_LABEL,
} from 'components/organisms/DescriptionForm/DescriptionForm.constants';
import {
  GALLERY_PHOTOS,
  MAIN_PHOTO,
} from 'components/organisms/MediaForm/MediaForm.constants';

import { Link } from '../../components/atoms';
import { ProjectPageFooter } from '../../components/molecules';
import { OnboardingFormTemplate } from '../../components/templates';
import { useUpdateProjectByIdMutation } from '../../generated/graphql';
import useMsgClient from '../../hooks/useMsgClient';
import { getHashUrl } from '../../lib/block-explorer';
import { isVCSCreditClass } from '../../lib/ecocredit/api';
import { getAccountProjectsByIdQueryKey } from '../../lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery.utils';
import { useCreateProjectContext } from '../ProjectCreate';
import { useGetJurisdiction } from './hooks/useGetJurisdiction';
import { useProjectCreateSubmit } from './hooks/useProjectCreateSubmit';
import { STORY_PHOTO, STORY_VIDEO } from './ProjectReview.constants';
import {
  getOnChainProjectId,
  getProjectReferenceID,
} from './ProjectReview.util';
import { VCSMetadata } from './ProjectReview.VCSMetadata';
import { useProjectSaveAndExit } from 'pages/ProjectCreate/hooks/useProjectSaveAndExit';

export const ProjectReview: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { setDeliverTxResponse } = useCreateProjectContext();
  const graphqlClient = useApolloClient();
  const reactQueryClient = useQueryClient();
  const { activeAccountId } = useAuth();

  const { data, isLoading } = useQuery(
    getProjectByIdQuery({
      client: graphqlClient,
      id: projectId,
    }),
  );
  const [txModalTitle, setTxModalTitle] = useState<string | undefined>();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [bannerError, setBannerError] = useState('');
  const [updateProject] = useUpdateProjectByIdMutation();

  const closeSubmitModal = (): void => setIsSubmitModalOpen(false);

  const handleTxQueued = (): void => {
    setIsSubmitModalOpen(true);
  };

  const handleTxModalClose = (): void => {
    setTxModalTitle(undefined);
    setDeliverTxResponse(undefined);
    setError(undefined);
  };

  const handleError = (): void => {
    closeSubmitModal();
    setTxModalTitle('MsgCreateProject Error');
  };

  const handleTxDelivered = async (
    _deliverTxResponse: DeliverTxResponse,
  ): Promise<void> => {
    setDeliverTxResponse(_deliverTxResponse);
    const projectOnChainId = getOnChainProjectId(_deliverTxResponse);
    if (projectId) {
      await updateProject({
        variables: {
          input: {
            id: projectId,
            projectPatch: {
              onChainId: projectOnChainId,
              metadata: getUnanchoredProjectMetadata(
                metadata,
                projectOnChainId,
              ),
            },
          },
        },
      });
      await reactQueryClient.invalidateQueries({
        queryKey: getProjectByIdKey(projectId),
      });
      navigate(`${editPath}/finished`);
    }
  };

  const { signAndBroadcast, wallet, error, setError, deliverTxResponse } =
    useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const { projectCreateSubmit } = useProjectCreateSubmit({ signAndBroadcast });
  const project = data?.data?.projectById;
  const editPath = `/project-pages/${projectId}`;
  const metadata = project?.metadata as ProjectMetadataLD;
  const jurisdiction = useGetJurisdiction({ metadata });
  const saveAndExit = useProjectSaveAndExit();

  const creditClassId = metadata?.['regen:creditClassId'];
  const isVCS = isVCSCreditClass(creditClassId);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const referenceId = getProjectReferenceID(metadata, creditClassId);

  const previewPhoto = metadata?.['regen:previewPhoto'];
  const galleryPhotos = metadata?.['regen:galleryPhotos'] ?? [];
  const storyMedia = metadata?.['regen:storyMedia'];
  const isVideo = storyMedia?.['@type'] === 'schema:VideoObject';
  const isImage = storyMedia?.['@type'] === 'schema:ImageObject';

  const submit = async (): Promise<void> => {
    if (!jurisdiction) {
      setBannerError(
        `Error getting ISO string for jurisdiction. Please edit your location.`,
      );
      return;
    }
    await projectCreateSubmit({
      classId: creditClassId || '',
      admin: wallet?.address || '',
      metadata: getAnchoredProjectMetadata(metadata, creditClassId),
      jurisdiction: jurisdiction || '',
      referenceId,
    });
    await reactQueryClient.invalidateQueries({
      queryKey: getAccountProjectsByIdQueryKey({
        id: activeAccountId,
      }),
    });
    await reactQueryClient.invalidateQueries({
      queryKey: [PROJECTS_QUERY_KEY],
    });
  };

  return (
    <OnboardingFormTemplate activeStep={1} title="Review" loading={isLoading}>
      <ReviewCard
        title="Basic Info"
        onEditClick={() => navigate(`${editPath}/basic-info`)}
        sx={{ mt: [8, 10] }}
      >
        <ItemDisplay name="Name">{metadata?.['schema:name']}</ItemDisplay>
        <ItemDisplay name="Size">
          {metadata?.['regen:projectSize']?.['qudt:numericValue'] || '-'}{' '}
          {
            QUDT_UNIT_MAP[
              metadata?.['regen:projectSize']?.['qudt:unit'] as qudtUnit
            ]
          }
        </ItemDisplay>
      </ReviewCard>
      <ReviewCard
        title="Location"
        onEditClick={() => navigate(`${editPath}/location`)}
      >
        <ItemDisplay>
          {metadata?.['schema:location']?.['place_name']}
        </ItemDisplay>
        <ItemDisplay name="Jurisdiction">{jurisdiction}</ItemDisplay>
      </ReviewCard>
      <ReviewCard
        title="Description"
        onEditClick={() => navigate(`${editPath}/description`)}
      >
        <ItemDisplay name={SUMMARY_LABEL}>
          {metadata?.['schema:description']}
        </ItemDisplay>
        <ItemDisplay name={STORY_LABEL}>
          {metadata?.['regen:story']}
        </ItemDisplay>
        <ItemDisplay name={STORY_TITLE_LABEL}>
          {metadata?.['regen:storyTitle']}
        </ItemDisplay>
      </ReviewCard>
      <ReviewCard
        title={'Media'}
        onEditClick={() => navigate(`${editPath}/media`)}
      >
        {previewPhoto?.['schema:url'] && (
          <ItemDisplay name={MAIN_PHOTO}>
            {previewPhoto && (
              <Photo
                src={previewPhoto['schema:url']}
                credit={previewPhoto['schema:creditText']}
              />
            )}
          </ItemDisplay>
        )}
        {galleryPhotos?.length > 0 && (
          <ItemDisplay name={GALLERY_PHOTOS}>
            {galleryPhotos?.map(
              photo =>
                photo && (
                  <Photo
                    key={photo['schema:url']}
                    src={photo['schema:url']}
                    caption={photo['schema:caption']}
                    credit={photo['schema:creditText']}
                    sx={{ mb: 2.5 }}
                  />
                ),
            )}
          </ItemDisplay>
        )}
        {storyMedia?.['schema:url'] && (
          <ItemDisplay name={isVideo ? STORY_VIDEO : STORY_PHOTO}>
            <>
              {isVideo && (
                <Card>
                  <CardMedia
                    component={ReactPlayer}
                    url={storyMedia['schema:url']}
                    fallback={<div>Loading video player...</div>}
                    height={isMobile ? 216 : 293}
                    width="100%"
                  />
                </Card>
              )}
              {isImage && (
                <Photo
                  src={storyMedia['schema:url']}
                  credit={storyMedia['schema:creditText']}
                />
              )}
            </>
          </ItemDisplay>
        )}
      </ReviewCard>
      {/* <ReviewCard
        title="Roles"
        onEditClick={() => navigate(`${editPath}/roles`)}
      >
        {metadata?.['regen:projectDeveloper'] && (
          <>
            <ItemDisplay name="Project Developer">
              {metadata?.['regen:projectDeveloper']?.['schema:name']}
            </ItemDisplay>
            <ItemDisplay>
              {metadata?.['regen:projectDeveloper']?.['schema:description']}
            </ItemDisplay>
          </>
        )}
      </ReviewCard> */}
      {!!creditClassId && (
        <ReviewCard
          title="Metadata"
          onEditClick={() => navigate(`${editPath}/metadata`)}
        >
          {isVCS ? (
            <VCSMetadata metadata={metadata} />
          ) : (
            <Box
              sx={theme => ({
                backgroundColor: theme.palette.primary.main,
                maxHeight: theme.spacing(88),
                fontSize: theme.spacing(3.5),
                padding: theme.spacing(4),
                marginTop: theme.spacing(3.5),
                border: `1px solid ${theme.palette.grey[600]}`,
                overflowX: 'scroll',
                overflowY: 'scroll',
              })}
            >
              <pre>
                {!!metadata &&
                  JSON.stringify(
                    omit(metadata, OMITTED_METADATA_KEYS),
                    null,
                    2,
                  )}
              </pre>
            </Box>
          )}
        </ReviewCard>
      )}
      <ProjectPageFooter
        saveText="publish"
        onSave={submit}
        onPrev={() =>
          creditClassId
            ? navigate(`${editPath}/metadata`)
            : navigate(`${editPath}/media`)
        }
        isSubmitting={isSubmitModalOpen}
        saveAndExit={saveAndExit}
      />
      <ProcessingModal open={isSubmitModalOpen} onClose={closeSubmitModal} />
      {error && txModalTitle && (
        <TxErrorModal
          error={error}
          open={!!error && (!!txModalTitle || !!deliverTxResponse)}
          onClose={handleTxModalClose}
          txHash={txHash || ''}
          txHashUrl={txHashUrl}
          cardTitle={txModalTitle}
          linkComponent={Link}
          onButtonClick={handleTxModalClose}
          buttonTitle="close"
        />
      )}
      {bannerError && <ErrorBanner text={bannerError} />}
    </OnboardingFormTemplate>
  );
};
