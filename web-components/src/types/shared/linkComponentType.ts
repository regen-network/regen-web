import { ElementType } from 'react';
import { SxProps } from '@mui/system';

import { Theme } from '../../theme/muiTheme';

export type LinkComponentType = ElementType<{
  href: string;
  sx?: SxProps<Theme>;
}>;
