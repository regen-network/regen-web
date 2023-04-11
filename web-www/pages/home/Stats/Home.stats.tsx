import StatCardsSection from 'web-components/lib/components/organisms/StatCardsSection';
import React from 'react';
import { ApolloQueryResult } from '@apollo/client';
import { StatsSectionQuery } from '@/generated/sanity-graphql';
import { normalizeStatCards } from '@/lib/utils/normalizers/normalizeStatCards';

type Props = {
  statsData?: ApolloQueryResult<StatsSectionQuery>;
};

const StatsSection = ({ statsData }: Props) => {
  const content = statsData?.data.allHomePageWeb[0].homeWebStatsSection;
  const cards = normalizeStatCards({ content });

  return (
    <StatCardsSection
      label={content?.label ?? ''}
      title={content?.title ?? ''}
      cards={cards}
    />
  );
};

export default StatsSection;
