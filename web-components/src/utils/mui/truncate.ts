import { SystemStyleObject } from '@mui/system';

import { Theme } from '../../theme/muiTheme';

export const truncateTwoLines: SystemStyleObject<Theme> = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical',
};
