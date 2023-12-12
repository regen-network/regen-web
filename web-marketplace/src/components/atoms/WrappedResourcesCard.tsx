import React from 'react';

import { BlockContent } from 'web-components/src/components/block-content';
import ResourcesCard from 'web-components/src/components/cards/ResourcesCard';
import { getFormattedDate } from 'web-components/src/utils/format';
import { getLinkTarget } from 'web-components/src/utils/linkTarget';

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
      target={getLinkTarget(resource?.button?.buttonBlankTarget)}
      link={getBtnHref(resource?.button)}
    />
  );
};

export { WrappedResourcesCard };
