import { SystemStyleObject } from '@mui/system';

import { Theme } from '../theme/muiTheme';

export const containerStyles: SystemStyleObject<Theme> = {
  maxWidth: theme => theme.breakpoints.values.lg,
  margin: '0 auto',
};

export const containerPaddingX: SystemStyleObject<Theme> = {
  px: { xs: 4, sm: 10, md: 37.5, xl: 5 },
};
