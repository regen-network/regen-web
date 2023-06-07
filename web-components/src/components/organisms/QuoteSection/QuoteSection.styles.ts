import { SystemStyleObject } from '@mui/system';

import { headerFontFamily, Theme } from '../../../theme/muiTheme';

export const quotemarkStyle: SystemStyleObject<Theme> = {
  fontFamily: headerFontFamily,
  fontStyle: 'normal',
  fontWeight: 900,
  fontSize: { xs: '70px', md: '100px' },
  lineHeight: '140%',
  color: theme => theme.palette.secondary.dark,
};

export const quoteHighlightStyle: SystemStyleObject<Theme> = {
  color: theme => theme.palette.secondary.contrastText,
  textShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
};
