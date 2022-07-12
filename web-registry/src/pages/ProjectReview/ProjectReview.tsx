import React from 'react';
import { useParams } from 'react-router-dom';

import { ReviewCard } from 'web-components/lib/components/cards/ReviewCard/ReviewCard';
import { ItemDisplay } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.ItemDisplay';
import { Photo } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.Photo';

import { OnboardingFormTemplate } from '../../components/templates';
import { useProjectByIdQuery } from '../../generated/graphql';
import { VCSProjectMetadataLD } from '../../generated/json-ld';
import { isVCSCreditClass } from '../../lib/ecocredit/api';

export const ProjectReview: React.FC = () => {
  const { projectId } = useParams();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });
  const project = data?.projectById;
  const creditClassId = project?.creditClassByCreditClassId?.onChainId;
  const isVCS = !!creditClassId && isVCSCreditClass(creditClassId);
  const metadata: Partial<VCSProjectMetadataLD> = project?.metadata;

  console.log('project', project);

  return (
    <OnboardingFormTemplate
      activeStep={2}
      title="Review"
      saveAndExit={() => Promise.resolve()}
    >
      <ReviewCard title="Basic Info" onEditClick={() => {}}>
        <ItemDisplay name="Name" value={metadata?.['schema:name']} />
        <ItemDisplay
          name="Size"
          value={`${
            metadata?.['regen:projectSize']?.['qudt:numericValue'] || '-'
          } ${metadata?.['regen:projectSize']?.['qudt:unit'] || '-'}`}
        />
      </ReviewCard>
      <ReviewCard title="Location" onEditClick={() => {}}>
        <ItemDisplay value={metadata?.['schema:location']?.place_name} />
      </ReviewCard>
      <ReviewCard title="Description" onEditClick={() => {}}>
        <ItemDisplay value={metadata?.['schema:description']?.['@value']} />
      </ReviewCard>
      <ReviewCard title="Photos" onEditClick={() => {}}>
        {metadata?.['regen:previewPhoto']?.['@value'] && (
          <Photo imgSrc={metadata?.['regen:previewPhoto']?.['@value']} />
        )}
        {metadata?.['regen:galleryPhotos']?.['@list']
          ?.filter(photo => !!photo?.['@value'])
          ?.map(photo => (
            <Photo imgSrc={photo?.['@value']} />
          ))}
      </ReviewCard>
      <ReviewCard title="Roles" onEditClick={() => {}}>
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
      <ReviewCard title="Metadata" onEditClick={() => {}}>
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
          <>not vcs</>
        )}
      </ReviewCard>
    </OnboardingFormTemplate>
  );
};
