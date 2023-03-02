import { Box, SxProps } from '@mui/material';

import StatCard from '../../../components/molecules/StatCard';
import { StatCardType } from '../../../components/molecules/StatCard/StatCard.types';
import { Theme } from '../../../theme/muiTheme';
import Section from '../Section';
import { STAT_CARDS_GRID_COLUMNS } from './StatCardsSection.constants';
import { getGridAreas, getGridTemplateAreas } from './StatCardsSection.utils';

export interface StatCardsSectionProps {
  label?: string;
  title?: string | JSX.Element;
  cards: StatCardType[];
  sx?: SxProps<Theme>;
}

const StatCardsSection = ({
  label,
  title,
  cards,
  sx,
}: StatCardsSectionProps) => {
  return (
    <Section
      label={label}
      title={title}
      sx={{ container: sx, title: { textAlign: 'left' } }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'auto',
            md: `repeat(${STAT_CARDS_GRID_COLUMNS}, 1fr)`,
          },
          gridTemplateRows: 'auto',
          gridTemplateAreas: {
            xs: 'none',
            md: getGridTemplateAreas({
              itemsCount: cards.length,
            }),
          },
          gap: '23px',
        }}
      >
        {cards.map(card => (
          <StatCard
            key={card.label}
            sx={getGridAreas({ itemsCount: STAT_CARDS_GRID_COLUMNS })}
            {...card}
          />
        ))}
      </Box>
    </Section>
  );
};

export { StatCardsSection };
