import { BlockContent } from 'web-components/src/components/block-content';
import type { ArticleCardProps } from 'web-components/src/components/cards/ArticleCard/ArticleCard';
import { ArticleType } from 'web-components/src/components/cards/ArticleCard/ArticleCard.types';
import type { ResourcesCardProps } from 'web-components/src/components/cards/ResourcesCard';
import { formatDate } from 'web-components/src/utils/format';

import {
  Maybe,
  MediaFieldsFragment,
  Resource,
} from '@/generated/sanity-graphql';
import {
  ARTICLE_CARD_BTN_TEXT_MAPPING,
  DRAFT_TEXT,
} from '@/lib/constants/shared.constants';

/**
 *
 * @param resources array of sanity resources
 * @returns props for our <ResourcesCard /> component
 */
export function sanityResourcesToCardProps(
  resources: Resource[],
): ResourcesCardProps[] {
  return (resources || []).map(card => {
    return {
      description: <BlockContent content={card?.descriptionRaw} />,
      image: {
        publicURL: card?.image?.imageHref || card?.image?.image?.asset?.url,
      },
      title: <BlockContent content={card?.titleRaw} />,
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
      type: (item?.type as ArticleType) || 'article',
      play: item?.type === 'video',
      draftText: DRAFT_TEXT,
      btnTextMapping: ARTICLE_CARD_BTN_TEXT_MAPPING,
    };
  });
}
