import { SxProps } from '@mui/material';

import type { Theme } from 'web-components/lib/theme/muiTheme';

export const getMediaBoxStyles = (theme: Theme): SxProps<Theme> => ({
  minHeight: {
    xs: theme.spacing(78.75),
    sm: theme.spacing(56.5),
    tablet: theme.spacing(76.5),
    md: theme.spacing(96.5),
    lg: theme.spacing(115),
    xl: theme.spacing(118),
  },
});
