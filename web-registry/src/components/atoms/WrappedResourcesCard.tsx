import React from 'react';

import { BlockContent } from 'web-components/lib/components/block-content';
import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import { getFormattedDate } from 'web-components/lib/utils/format';

import { Maybe, ResourceFieldsFragment } from '../../generated/sanity-graphql';
import { getBtnHref } from '../../lib/button';
import { getSanityImgSrc } from '../../lib/imgSrc';

/**
 * ResourcesCard wrapping content from Sanity
 * TODO: once we migrate website content, this can be deleted
 */
const WrappedResourcesCard: React.FC<
  React.PropsWithChildren<{
    resource: Maybe<ResourceFieldsFragment>;
  }>
> = ({ resource }) => {
  return (
    <ResourcesCard
      image={{ publicURL: getSanityImgSrc(resource?.image) }}
      title={<BlockContent content={resource?.titleRaw} />}
      description={<BlockContent content={resource?.descriptionRaw} />}
      updated={getFormattedDate(resource?.lastUpdated || resource?._updatedAt)}
      buttonText={resource?.button?.buttonText}
      target={resource?.button?.buttonBlankTarget ? '_blank' : '_self'}
      link={getBtnHref(resource?.button)}
    />
  );
};

export { WrappedResourcesCard };
