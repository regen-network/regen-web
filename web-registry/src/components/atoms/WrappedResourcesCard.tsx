import React from 'react';

import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import { BlockContent } from 'web-components/lib/components/block-content';
import { ResourceFieldsFragment, Maybe } from '../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../lib/imgSrc';
import { getBtnHref } from '../../lib/button';

/**
 * ResourcesCard wrapping content from Sanity
 * TODO: once we migrate website content, this can be deleted
 */
const WrappedResourcesCard: React.FC<{
  resource: Maybe<ResourceFieldsFragment>;
}> = ({ resource }) => {
  return (
    <ResourcesCard
      image={{ publicURL: getSanityImgSrc(resource?.image) }}
      title={<BlockContent content={resource?.titleRaw} />}
      description={<BlockContent content={resource?.descriptionRaw} />}
      updated={resource?.lastUpdated || resource?._updatedAt}
      buttonText={resource?.button?.buttonText}
      target={resource?.button?.buttonBlankTarget ? '_blank' : '_self'}
      link={getBtnHref(resource?.button)}
    />
  );
};

export { WrappedResourcesCard };
