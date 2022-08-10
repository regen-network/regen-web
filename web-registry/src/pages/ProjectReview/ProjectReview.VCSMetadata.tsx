import React from 'react';

import { ItemDisplay } from 'web-components/lib/components/cards/ReviewCard/ReviewCard.ItemDisplay';
import { formatDate } from 'web-components/lib/utils/format';

import { Link } from '../../components/atoms';
import { VCSProjectMetadataLD } from '../../generated/json-ld';

interface Props {
  metadata: Partial<VCSProjectMetadataLD>;
}

const VCSMetadata: React.FC<Props> = ({ metadata }) => {
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
          href={
            metadata?.['regen:projectActivity']?.['schema:url']?.['@value'] ||
            ''
          }
        >
          {metadata?.['regen:projectActivity']?.['schema:url']?.['@value']}
        </Link>
      </ItemDisplay>
      <ItemDisplay name="VCS project ID">
        {metadata?.['regen:vcsProjectId']}
      </ItemDisplay>
      <ItemDisplay name="VCS project page url">
        <Link
          target="_blank"
          href={metadata?.['regen:vcsProjectPage']?.['@value'] || ''}
        >
          {metadata?.['regen:vcsProjectPage']?.['@value']}
        </Link>
      </ItemDisplay>
      <ItemDisplay name="Project start and end date">{`${formatDate(
        metadata?.['regen:projectStartDate']?.['@value'],
        undefined,
        true,
      )} - ${formatDate(
        metadata?.['regen:projectEndDate']?.['@value'],
        undefined,
        true,
      )}`}</ItemDisplay>
      <ItemDisplay name="VCS methodology name">
        {metadata?.['regen:vcsMethodology']?.['schema:name']}
      </ItemDisplay>
      <ItemDisplay name="VCS methodology url">
        <Link
          target="_blank"
          href={
            metadata?.['regen:vcsMethodology']?.['schema:url']?.['@value'] || ''
          }
        >
          {metadata?.['regen:vcsMethodology']?.['schema:url']?.['@value']}
        </Link>
      </ItemDisplay>
    </>
  );
};

export { VCSMetadata };
