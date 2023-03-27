import { SystemStyleObject } from '@mui/system';

import { Theme } from '../theme/muiTheme';

export const containerStyles: SystemStyleObject<Theme> = {
  maxWidth: theme => theme.breakpoints.values.lg,
  margin: '0 auto',
};
