import { StatCardType } from 'web-components/lib/components/molecules/StatCard/StatCard.types';

import { StatsSectionQuery } from '@/generated/sanity-graphql';

type Params = {
  content?: StatsSectionQuery['allHomePageWeb'][0]['homeWebStatsSection'];
};

export const normalizeStatCards = ({ content }: Params): StatCardType[] => {
  return (
    content?.cards?.map(card => ({
      label: card?.label ?? '',
      stat: card?.stat ?? '',
      description: card?.descriptionRaw ?? '',
      image: {
        src: card?.image?.image?.asset?.url ?? card?.image?.imageHref ?? '',
        alt: card?.image?.imageAlt ?? '',
      },
    })) ?? []
  );
};
