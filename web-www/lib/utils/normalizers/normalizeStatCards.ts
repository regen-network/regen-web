import { StatCardType } from '@regen-network/web-components/lib/components/molecules/StatCard/StatCard.types';
import {
  HomeStatsSectionQuery,
  SanityHomeWebStatsSection,
} from '../../generated/graphql';

type Params = {
  content?: HomeStatsSectionQuery['sanityHomePageWeb'];
};

export const normalizeStatCards = ({ content }: Params): StatCardType[] => {
  return (
    content?.homeWebStatsSection?.cards?.map(card => ({
      label: card?.label ?? '',
      stat: card?.stat ?? '',
      description: card?._rawDescription ?? '',
      image: {
        src: card?.image?.image?.asset?.url ?? card?.image?.imageHref ?? '',
        alt: card?.image?.imageAlt ?? '',
      },
    })) ?? []
  );
};
