import React from 'react';

import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import { BlockContent } from 'web-components/lib/components/block-content';
import { ResourceFieldsFragment, Maybe } from '../../generated/sanity-graphql';

/**
 * ResourcesCard wrapping content from Sanity
 * TODO: once we migrate website content, this can be deleted
 */
const WrappedResourcesCard: React.FC<{
  resource: Maybe<ResourceFieldsFragment>;
}> = ({ resource }) => {
  return (
    <ResourcesCard
      image={{ publicURL: resource?.image?.imageHref || resource?.image?.image?.asset?.url || '' }}
      title={<BlockContent content={resource?.titleRaw} />}
      description={<BlockContent content={resource?.descriptionRaw} />}
      updated={resource?.lastUpdated || resource?._updatedAt}
      buttonText={resource?.button?.buttonText}
      target={resource?.button?.buttonBlankTarget ? '_blank' : '_self'}
      link={resource?.button?.buttonLink?.buttonHref || resource?.button?.buttonLink?.buttonDoc?.href || ''}
    />
  );
};

export { WrappedResourcesCard };
