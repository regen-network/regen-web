import React, { useState } from 'react';
import ReactPlayerLazy from 'react-player/lazy';
import { useNavigate, useParams } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { Box, CardMedia, useMediaQuery, useTheme } from '@mui/material';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import Card from 'web-components/lib/components/cards/Card';
import { ReviewCard } from 'web-components/lib/components/cards/ReviewCard/ReviewCard';
import { ItemDisplay } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.ItemDisplay';
import { Photo } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.Photo';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { UrlType } from 'web-components/lib/utils/schemaURL';

import { Link } from '../../components/atoms';
import { ProjectPageFooter } from '../../components/molecules';
import { OnboardingFormTemplate } from '../../components/templates';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
} from '../../generated/graphql';
import useMsgClient from '../../hooks/useMsgClient';
import { getHashUrl } from '../../lib/block-explorer';
import { isVCSCreditClass } from '../../lib/ecocredit/api';
import { qudtUnit, qudtUnitMap } from '../../lib/rdf';
import { useCreateProjectContext } from '../ProjectCreate';
import { useCompactMetadata } from './hooks/useCompactMetadata';
import { useGetJurisdiction } from './hooks/useGetJurisdiction';
import { useProjectCreateSubmit } from './hooks/useProjectCreateSubmit';
import {
  getOnChainProjectId,
  getProjectReferenceID,
} from './ProjectReview.util';
import { VCSMetadata } from './ProjectReview.VCSMetadata';

export const ProjectReview: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { setDeliverTxResponse, creditClassId } = useCreateProjectContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, loading } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });
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
    await updateProject({
      variables: {
        input: {
          id: projectId,
          projectPatch: {
            onChainId: projectOnChainId,
          },
        },
      },
    });
    navigate(`${editPath}/finished`);
  };

  const { signAndBroadcast, wallet, error, setError, deliverTxResponse } =
    useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const { projectCreateSubmit } = useProjectCreateSubmit({ signAndBroadcast });
  const project = data?.projectById;
  const editPath = `/project-pages/${projectId}`;
  const metadataRaw = project?.metadata;
  const metadata = useCompactMetadata({ metadataRaw });
  const jurisdiction = useGetJurisdiction({ metadata });
  const isVCS = isVCSCreditClass(creditClassId);

  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const videoUrl = metadata?.['regen:videoURL']?.['@value'];
  const referenceId = getProjectReferenceID(metadata, creditClassId);

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
      metadata,
      jurisdiction: jurisdiction || '',
      referenceId,
    });
  };

  return (
    <OnboardingFormTemplate activeStep={1} title="Review" loading={loading}>
      <ReviewCard
        title="Basic Info"
        onEditClick={() => navigate(`${editPath}/basic-info`)}
        sx={{ mt: [8, 10] }}
      >
        <ItemDisplay name="Name">{metadata?.['schema:name']}</ItemDisplay>
        <ItemDisplay name="Size">
          {metadata?.['regen:projectSize']?.['qudt:numericValue']?.['@value'] ||
            '-'}{' '}
          {
            qudtUnitMap[
              metadata?.['regen:projectSize']?.['qudt:unit']?.[
                '@value'
              ] as qudtUnit
            ]
          }
        </ItemDisplay>
      </ReviewCard>
      <ReviewCard
        title="Location"
        onEditClick={() => navigate(`${editPath}/location`)}
      >
        <ItemDisplay>
          {metadata?.['schema:location']?.['geojson:place_name']}
        </ItemDisplay>
        <ItemDisplay name="Jurisdiction">{jurisdiction}</ItemDisplay>
      </ReviewCard>
      <ReviewCard
        title="Description"
        onEditClick={() => navigate(`${editPath}/description`)}
      >
        <ItemDisplay>{metadata?.['schema:description']}</ItemDisplay>
      </ReviewCard>
      <ReviewCard
        title={videoUrl ? 'Media' : 'Photos'}
        onEditClick={() => navigate(`${editPath}/media`)}
      >
        {metadata?.['regen:previewPhoto']?.['@value'] && (
          <Photo src={metadata?.['regen:previewPhoto']?.['@value']} />
        )}
        {metadata?.['regen:galleryPhotos']?.['@list']
          ?.filter((photo: UrlType) => !!photo?.['@value'])
          ?.map(
            (photo: UrlType) =>
              photo?.['@value'] && <Photo src={photo?.['@value']} />,
          )}
        {videoUrl && (
          <Card>
            <CardMedia
              component={ReactPlayerLazy}
              url={videoUrl}
              fallback={<div>Loading video player...</div>}
              height={isMobile ? 216 : 293}
              width="100%"
            />
          </Card>
        )}
      </ReviewCard>
      <ReviewCard
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
      </ReviewCard>
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
            <pre>{!!metadata && JSON.stringify(metadata, null, 2)}</pre>
          </Box>
        )}
      </ReviewCard>
      <ProjectPageFooter
        onSave={submit}
        onPrev={() => navigate(`${editPath}/metadata`)}
        saveDisabled={isSubmitModalOpen}
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
