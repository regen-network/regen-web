import React from 'react';
import { ResourcesCardProps } from 'web-components/lib/components/cards/ResourcesCard';
import { Document } from 'web-components/lib/components/table';
import { BlockContent } from 'web-components/src/components/block-content';
import { SanityDoc, SanityResource } from '../generated/graphql';

/**
 *
 * @param resources array of sanity resources
 * @returns props for our <ResourcesCard /> component
 */
export function sanityResourcesToCardProps(resources: SanityResource[]): ResourcesCardProps[] {
  return (resources || []).map(card => {
    return {
      description: <BlockContent content={card?._rawDescription} />,
      image: { publicURL: card?.image?.imageHref || card?.image?.image?.asset?.url },
      title: <BlockContent content={card?._rawTitle} />,
      link: card?.button?.buttonLink?.buttonDoc?.href,
      buttonText: card?.button?.buttonText,
      updated: card?.lastUpdated,
    } as ResourcesCardProps;
  });
}

/**
 *
 * @param docs array of sanity docs
 * @returns props for our <Table /> component
 */
export function sanityDocsToDocuments(docs: SanityDoc[]): Document[] {
  return (docs || []).map(doc => {
    return {
      date: doc?.date,
      ledger: doc?.type,
      type: doc?.type,
      name: doc?.name,
      url: doc?.href,
    } as Document;
  });
}
