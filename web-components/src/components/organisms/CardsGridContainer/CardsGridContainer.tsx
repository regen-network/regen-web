import { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';

export interface Props {
  cardsCount: number;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

const CardsGridContainer = ({
  children,
  cardsCount,
  sx = [],
}: Props): JSX.Element => {
  return (
    <Box
      sx={[
        ...sxToArray(sx),
        {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))',
          gridGap: ['1.75rem', '1.5rem', '1.25rem'],
          justifyContent:
            cardsCount > 2 ? { xs: 'center' } : { xs: 'center', md: 'left' },
        },
      ]}
    >
      {children}
    </Box>
  );
};

export { CardsGridContainer };
