import React from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

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
  const { _ } = useLingui();
  return (
    <>
      <ItemDisplay name={_(msg`Offset generation method`)}>
        {metadata?.['regen:offsetGenerationMethod']}
      </ItemDisplay>
      <ItemDisplay name={_(msg`Project activity`)}>
        {metadata?.['regen:projectActivity']?.['schema:name']}
      </ItemDisplay>
      <ItemDisplay name={_(msg`Project activity url`)}>
        <Link
          target="_blank"
          href={metadata?.['regen:projectActivity']?.['schema:url'] || ''}
        >
          {metadata?.['regen:projectActivity']?.['schema:url']}
        </Link>
      </ItemDisplay>
      <ItemDisplay name={_(msg`VCS project ID`)}>
        {metadata?.['regen:vcsProjectId']}
      </ItemDisplay>
      <ItemDisplay name={_(msg`VCS project page url`)}>
        <Link target="_blank" href={metadata?.['regen:vcsProjectPage'] || ''}>
          {metadata?.['regen:vcsProjectPage']}
        </Link>
      </ItemDisplay>
      <ItemDisplay name={_(msg`Project start and end date`)}>{`${formatDate(
        metadata?.['regen:projectStartDate'],
        undefined,
        true,
      )} - ${formatDate(
        metadata?.['regen:projectEndDate'],
        undefined,
        true,
      )}`}</ItemDisplay>
      <ItemDisplay name={_(msg`VCS methodology name`)}>
        {metadata?.['regen:vcsMethodology']?.['schema:name']}
      </ItemDisplay>
      <ItemDisplay name={_(msg`VCS methodology url`)}>
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
