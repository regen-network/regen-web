import { StatCardType } from 'web-components/src/components/molecules/StatCard/StatCard.types';

import { StatsSectionFieldsFragment } from '@/generated/sanity-graphql';

type Params = {
  statsData?: StatsSectionFieldsFragment['homeWebStatsSection'];
};

export const normalizeStatCards = ({ statsData }: Params): StatCardType[] => {
  return (
    statsData?.cards?.map(card => ({
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
