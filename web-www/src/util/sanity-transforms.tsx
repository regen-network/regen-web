import React from 'react';
import type { ArticleCardProps } from '@regen-network/web-components/lib/components/cards/ArticleCard';
import type { ResourcesCardProps } from '@regen-network/web-components/lib/components/cards/ResourcesCard';
import type { Document } from '@regen-network/web-components/lib/components/table/DocumentationTable';
import { formatDate } from '@regen-network/web-components/lib/utils/format';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';

import {
  Maybe,
  MediaFieldsFragment,
  SanityDoc,
  SanityResource,
} from '../generated/graphql';

/**
 *
 * @param resources array of sanity resources
 * @returns props for our <ResourcesCard /> component
 */
export function sanityResourcesToCardProps(
  resources: SanityResource[],
): ResourcesCardProps[] {
  return (resources || []).map(card => {
    return {
      description: <BlockContent content={card?._rawDescription} />,
      image: {
        publicURL: card?.image?.imageHref || card?.image?.image?.asset?.url,
      },
      title: <BlockContent content={card?._rawTitle} />,
      link:
        card?.button?.buttonLink?.buttonHref ||
        card?.button?.buttonLink?.buttonDoc?.href,
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

/**
 *
 * @param media array of sanity media items using ..mediaFields fragment
 * @returns props for our <ArticleCard /> component
 */
export function sanityMediaToArticleCardProps(
  media?: Maybe<Array<Maybe<MediaFieldsFragment>>>,
): ArticleCardProps[] {
  return (media || []).map(item => {
    return {
      author: item?.author || '',
      date: formatDate(item?.date) || '',
      imgSrc: item?.image?.image?.asset?.url || item?.image?.imageHref || '',
      url: item?.href || '',
      name: item?.title || '',
      type: item?.type || '',
      play: item?.type === 'video',
    };
  });
}
