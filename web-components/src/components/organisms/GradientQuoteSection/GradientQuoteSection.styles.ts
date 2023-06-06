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

export const greenGradientStyle: SystemStyleObject<Theme> = {
  background:
    'linear-gradient(197.46deg, #7D9AA2 8.02%, #9AD3BE 43.42%, #D1E2C7 78.83%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  textShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
};
