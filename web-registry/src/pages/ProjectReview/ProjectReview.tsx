import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ReviewCard } from 'web-components/lib/components/cards/ReviewCard/ReviewCard';
import { ItemDisplay } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.ItemDisplay';
import { Photo } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.Photo';
import { getISOString } from 'web-components/lib/utils/locationStandard';

import { OnboardingFormTemplate } from '../../components/templates';
import { useProjectByIdQuery } from '../../generated/graphql';
import { VCSProjectMetadataLD } from '../../generated/json-ld';
import { isVCSCreditClass } from '../../lib/ecocredit/api';
import { Box } from '@mui/material';
import { qudtUnit, qudtUnitMap } from '../../lib/rdf';
import { ProjectPageFooter } from '../../components/molecules';
import { useProjectCreateSubmit } from './hooks/useProjectCreateSubmit';
import useMsgClient from '../../hooks/useMsgClient';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';

export const ProjectReview: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });

  const handleTxQueued = (): void => {
    console.log('handleTxQueued');
  };

  const handleError = (): void => {
    console.log('handleError');
  };

  const handleTxDelivered = (): void => {
    console.log('handleTxDelivered');
  };

  const {
    signAndBroadcast,
    // setDeliverTxResponse,
    wallet,
    // deliverTxResponse,
    // error,
    // setError,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const project = data?.projectById;
  const editPath = `/project-pages/${projectId}`;
  const creditClassId = project?.creditClassByCreditClassId?.onChainId;
  const isVCS = !!creditClassId && isVCSCreditClass(creditClassId);
  const metadata: Partial<VCSProjectMetadataLD> = project?.metadata;

  console.log('project', project);

  const [jurisdiction, setJurisdiction] = useState('');
  const [geocodingError, setGeocodingError] = useState<string | null>(null);

  useEffect(() => {
    const getJurisdiction = async (): Promise<void> => {
      if (!mapboxToken) return Promise.reject();
      const location = metadata?.['schema:location'];
      if (!location) setJurisdiction('');
      console.log(location);
      const context: GeocodeFeature[] = location?.context || [];
      let countryKey = '';
      let stateProvince = '';
      let postalCode = '';
      context.forEach(ctx => {
        if (ctx.id.includes('country')) {
          countryKey = ctx.text;
          return;
        }
        if (ctx.id.includes('region')) {
          stateProvince = ctx.text;
          return;
        }
        if (ctx.id.includes('postcode')) {
          postalCode = ctx.text;
          return;
        }
      });

      try {
        const isoString = await getISOString(mapboxToken, {
          countryKey,
          stateProvince,
          postalCode,
        });

        console.log('isoString', isoString);

        if (geocodingError) setGeocodingError(null);

        if (isoString) setJurisdiction(isoString);
      } catch (err) {
        // initially this effect may fail mainly because the accessToken
        // (mapboxToken) is not set in the environment variables.
        setGeocodingError((err as string) || 'Geocoding service not available');
      }
    };

    getJurisdiction();
  }, [mapboxToken, geocodingError, setGeocodingError, metadata]);

  const projectCreateSubmit = useProjectCreateSubmit({
    classId: creditClassId || '',
    admin: wallet?.address || '',
    metadata,
    jurisdiction,
    // referenceId:,
    signAndBroadcast,
  });

  return (
    <OnboardingFormTemplate
      activeStep={1}
      title="Review"
      saveAndExit={() => Promise.resolve()}
    >
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
        title="Photos"
        onEditClick={() => navigate(`${editPath}/media`)}
      >
        {metadata?.['regen:previewPhoto']?.['@value'] && (
          <Photo imgSrc={metadata?.['regen:previewPhoto']?.['@value']} />
        )}
        {metadata?.['regen:galleryPhotos']?.['@list']
          ?.filter(photo => !!photo?.['@value'])
          ?.map(photo => (
            <Photo imgSrc={photo?.['@value']} />
          ))}
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
          <>
            <ItemDisplay
              name="Offset generation method"
              value={metadata?.['regen:offsetGenerationMethod']}
            />
            <ItemDisplay
              name="Project activity"
              value={metadata?.['regen:projectActivity']?.['schema:name']}
            />
            <ItemDisplay
              name="Project activity url"
              value={
                metadata?.['regen:projectActivity']?.['schema:url']?.['@value']
              }
            />
            <ItemDisplay
              name="VCS project ID"
              value={metadata?.['regen:vcsProjectId']}
            />
            <ItemDisplay
              name="VCS project page url"
              value={metadata?.['regen:vcsProjectPage']?.['@value']}
            />
            <ItemDisplay
              name="Project duration"
              value={metadata?.['regen:projectStartDate']?.['@value']}
            />
            <ItemDisplay
              name="VCS methodology name"
              value={metadata?.['regen:vcsMethodology']?.['@value']}
            />
            <ItemDisplay
              name="VCS methodology url"
              value={metadata?.['regen:vcsMethodology']?.['@value']}
            />
          </>
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
            <pre>{metadata && JSON.stringify(metadata, null, 2)}</pre>
          </Box>
        )}
      </ReviewCard>
      <ProjectPageFooter onSave={projectCreateSubmit} saveDisabled={false} />
    </OnboardingFormTemplate>
  );
};
