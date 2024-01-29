import { SxProps } from '@mui/material';

import { Theme } from 'web-components/src/theme/muiTheme';

export const spacing = {
  header: {
    px: (theme: Theme) => ({ xs: theme.spacing(3.75), md: theme.spacing(6) }),
  } as SxProps,
};
