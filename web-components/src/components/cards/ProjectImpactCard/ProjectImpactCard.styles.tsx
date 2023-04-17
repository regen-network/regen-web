import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../../theme/muiTheme';

export const useProjectImpactCardStyles = makeStyles()((theme: Theme) => ({
  image: {
    height: '100%',
    objectFit: 'none',
  },
}));
