import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { Box, CardMedia, useMediaQuery, useTheme } from '@mui/material';
import ReactPlayerLazy from 'react-player/lazy';

import Card from 'web-components/lib/components/cards/Card';
import { ReviewCard } from 'web-components/lib/components/cards/ReviewCard/ReviewCard';
import { ItemDisplay } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.ItemDisplay';
import { Photo } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.Photo';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';

import { OnboardingFormTemplate } from '../../components/templates';
import { useProjectByIdQuery } from '../../generated/graphql';
import { VCSProjectMetadataLD } from '../../generated/json-ld';
import { isVCSCreditClass } from '../../lib/ecocredit/api';
import { qudtUnit, qudtUnitMap } from '../../lib/rdf';
import { ProjectPageFooter } from '../../components/molecules';
import { useProjectCreateSubmit } from './hooks/useProjectCreateSubmit';
import useMsgClient from '../../hooks/useMsgClient';
import { useGetJurisdiction } from './hooks/useGetJurisdiction';
import { useCreateProjectContext } from '../../features/ecocredit/CreateProject/CreateProjectContext';
import { Link } from '../../components/atoms';
import { getHashUrl } from '../../lib/block-explorer';
import { VCSMetadata } from './ProjectReview.VCSMetadata';

export const ProjectReview: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const createProjectContext = useCreateProjectContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });
  const [txModalTitle, setTxModalTitle] = useState<string | undefined>();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const closeSubmitModal = () => setIsSubmitModalOpen(false);

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

  const handleTxDelivered = (deliverTxResponse: DeliverTxResponse): void => {
    createProjectContext.deliverTxResponse = deliverTxResponse;
    navigate(`${editPath}/finished`);
  };

  const {
    signAndBroadcast,
    deliverTxResponse,
    wallet,
    error,
    setError,
    setDeliverTxResponse,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const { projectCreateSubmit } = useProjectCreateSubmit({ signAndBroadcast });
  const project = data?.projectById;
  const editPath = `/project-pages/${projectId}`;
  const creditClassId = project?.creditClassByCreditClassId?.onChainId;
  const isVCS = !!creditClassId && isVCSCreditClass(creditClassId);
  const metadata: Partial<VCSProjectMetadataLD> = project?.metadata;
  const jurisdiction = useGetJurisdiction(metadata);
  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const videoUrl = metadata?.['regen:videoURL']?.['@value'];

  const submit = () => {
    projectCreateSubmit({
      classId: creditClassId || '',
      admin: wallet?.address || '',
      metadata,
      jurisdiction,
      referenceId: isVCS ? `VCS-${metadata?.['regen:vcsProjectId']}` : '', //TODO
    });
  };

  return (
    <OnboardingFormTemplate activeStep={1} title="Review">
      <ReviewCard
        title="Basic Info"
        onEditClick={() => navigate(`${editPath}/basic-info`)}
      >
        <ItemDisplay name="Name" value={metadata?.['schema:name']} />
        <ItemDisplay
          name="Size"
          value={`${
            metadata?.['regen:projectSize']?.['qudt:numericValue']?.[
              '@value'
            ] || '-'
          } ${
            qudtUnitMap[
              metadata?.['regen:projectSize']?.['qudt:unit']?.[
                '@value'
              ] as qudtUnit
            ]
          }`}
        />
      </ReviewCard>
      <ReviewCard
        title="Location"
        onEditClick={() => navigate(`${editPath}/location`)}
      >
        <ItemDisplay value={metadata?.['schema:location']?.place_name} />
        <ItemDisplay value={jurisdiction} />
      </ReviewCard>
      <ReviewCard
        title="Description"
        onEditClick={() => navigate(`${editPath}/description`)}
      >
        <ItemDisplay value={metadata?.['schema:description']} />
      </ReviewCard>
      <ReviewCard
        title={videoUrl ? 'Media' : 'Photos'}
        onEditClick={() => navigate(`${editPath}/media`)}
      >
        {metadata?.['regen:previewPhoto']?.['@value'] && (
          <Photo src={metadata?.['regen:previewPhoto']?.['@value']} />
        )}
        {metadata?.['regen:galleryPhotos']?.['@list']
          ?.filter(photo => !!photo?.['@value'])
          ?.map(photo => (
            <Photo src={photo?.['@value']} />
          ))}
        {videoUrl && (
          <Card
            sx={{
              mt: 9,
              mb: 2,
            }}
          >
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
            <ItemDisplay
              name="Project Developer"
              value={metadata?.['regen:projectDeveloper']?.['schema:name']}
            />
            <ItemDisplay
              value={
                metadata?.['regen:projectDeveloper']?.['schema:description']
              }
            />
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
      <ProjectPageFooter onSave={submit} saveDisabled={isSubmitModalOpen} />
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
          onViewPortfolio={handleTxModalClose}
          buttonTitle="close"
        />
      )}
    </OnboardingFormTemplate>
  );
};
