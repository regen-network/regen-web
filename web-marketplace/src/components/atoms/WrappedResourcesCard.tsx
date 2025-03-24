import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { BlockContent } from 'web-components/src/components/block-content';
import ResourcesCard from 'web-components/src/components/cards/ResourcesCard';
import { getFormattedDate } from 'web-components/src/utils/format';
import { getLinkTarget } from 'web-components/src/utils/linkTarget';

import { DRAFT_TEXT } from 'lib/constants/shared.constants';

import { Maybe, ResourceFieldsFragment } from '../../generated/sanity-graphql';
import { getBtnHref } from '../../lib/button';
import { getSanityImgSrc } from '../../lib/imgSrc';

/**
 * ResourcesCard wrapping content from Sanity
 */
const WrappedResourcesCard: React.FC<
  React.PropsWithChildren<{
    resource: Maybe<ResourceFieldsFragment>;
  }>
> = ({ resource }) => {
  const { _ } = useLingui();

  return (
    <ResourcesCard
      image={{ publicURL: getSanityImgSrc(resource?.image) }}
      title={<BlockContent content={resource?.titleRaw} />}
      description={<BlockContent content={resource?.descriptionRaw} />}
      updated={getFormattedDate(resource?.lastUpdated || resource?._updatedAt)}
      buttonText={resource?.button?.buttonText ?? _(msg`view resource`)}
      updatedLabel={_(msg`Last Updated:`)}
      target={getLinkTarget(resource?.button?.buttonBlankTarget)}
      link={getBtnHref(resource?.button)}
      draftText={_(DRAFT_TEXT)}
    />
  );
};

export { WrappedResourcesCard };
