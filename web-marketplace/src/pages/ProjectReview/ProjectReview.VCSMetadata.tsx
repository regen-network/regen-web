import React from 'react';

import { ItemDisplay } from 'web-components/src/components/cards/ReviewCard/ReviewCard.ItemDisplay';
import { formatDate } from 'web-components/src/utils/format';

import { VCSProjectMetadataLD } from 'lib/db/types/json-ld';

import { Link } from '../../components/atoms';

interface Props {
  metadata: Partial<VCSProjectMetadataLD>;
}

const VCSMetadata: React.FC<React.PropsWithChildren<Props>> = ({
  metadata,
}) => {
  return (
    <>
      <ItemDisplay name="Offset generation method">
        {metadata?.['regen:offsetGenerationMethod']}
      </ItemDisplay>
      <ItemDisplay name="Project activity">
        {metadata?.['regen:projectActivity']?.['schema:name']}
      </ItemDisplay>
      <ItemDisplay name="Project activity url">
        <Link
          target="_blank"
          href={metadata?.['regen:projectActivity']?.['schema:url'] || ''}
        >
          {metadata?.['regen:projectActivity']?.['schema:url']}
        </Link>
      </ItemDisplay>
      <ItemDisplay name="VCS project ID">
        {metadata?.['regen:vcsProjectId']}
      </ItemDisplay>
      <ItemDisplay name="VCS project page url">
        <Link target="_blank" href={metadata?.['regen:vcsProjectPage'] || ''}>
          {metadata?.['regen:vcsProjectPage']}
        </Link>
      </ItemDisplay>
      <ItemDisplay name="Project start and end date">{`${formatDate(
        metadata?.['regen:projectStartDate'],
        undefined,
        true,
      )} - ${formatDate(
        metadata?.['regen:projectEndDate'],
        undefined,
        true,
      )}`}</ItemDisplay>
      <ItemDisplay name="VCS methodology name">
        {metadata?.['regen:vcsMethodology']?.['schema:name']}
      </ItemDisplay>
      <ItemDisplay name="VCS methodology url">
        <Link
          target="_blank"
          href={metadata?.['regen:vcsMethodology']?.['schema:url'] || ''}
        >
          {metadata?.['regen:vcsMethodology']?.['schema:url']}
        </Link>
      </ItemDisplay>
    </>
  );
};

export { VCSMetadata };
