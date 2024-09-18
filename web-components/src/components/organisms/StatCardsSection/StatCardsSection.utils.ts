/* eslint-disable lingui/no-unlocalized-strings */
import { SxProps } from '@mui/system';

import { Theme } from '../../../theme/muiTheme';
import { STAT_CARDS_GRID_CARDS_BY_ROW } from './StatCardsSection.constants';

type GetGridTemplateAreasParams = {
  itemsCount: number;
};

export const getGridTemplateAreas = ({
  itemsCount,
}: GetGridTemplateAreasParams) => {
  const rowsCount = Math.ceil(itemsCount / STAT_CARDS_GRID_CARDS_BY_ROW);
  return Array.from({ length: rowsCount })
    .map((_, rowIndex) => {
      const isEven = rowIndex % STAT_CARDS_GRID_CARDS_BY_ROW === 0;
      const c1 = rowIndex * STAT_CARDS_GRID_CARDS_BY_ROW + 1;
      const c2 = rowIndex * STAT_CARDS_GRID_CARDS_BY_ROW + 2;
      return isEven
        ? `"card${c1} card${c1} card${c1} card${c1} card${c2} card${c2} card${c2} card${c2} card${c2} card${c2} card${c2} card${c2}"`
        : `"card${c1} card${c1} card${c1} card${c1} card${c1} card${c1} card${c1} card${c1} card${c2} card${c2} card${c2} card${c2}"`;
    })
    .join(' ');
};

type GetGridAreasParams = {
  itemsCount: number;
};
export const getGridAreas = ({ itemsCount }: GetGridAreasParams) => {
  return Array.from({ length: itemsCount }).reduce<
    Record<string, SxProps<Theme>>
  >((previousValue, _, currentIndex) => {
    previousValue[`:nth-child(n+${currentIndex + 1})`] = {
      gridArea: { xs: '', md: `card${currentIndex + 1}` },
    };

    return previousValue;
  }, {});
};
