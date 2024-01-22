import StatCardsSection from 'web-components/src/components/organisms/StatCardsSection';

import { StatsSectionFieldsFragment } from '@/generated/sanity-graphql';
import { normalizeStatCards } from '@/lib/utils/normalizers/normalizeStatCards';

type Props = {
  statsData?: StatsSectionFieldsFragment['homeWebStatsSection'];
};

const StatsSection = ({ statsData }: Props) => {
  const cards = normalizeStatCards({ statsData });

  return (
    <StatCardsSection
      label={statsData?.label ?? ''}
      title={statsData?.title ?? ''}
      cards={cards}
    />
  );
};

export default StatsSection;
