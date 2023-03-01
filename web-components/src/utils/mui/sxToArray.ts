import { SxProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';

type SxPropsType = SxProps<Theme>;

export const sxToArray = (sx?: SxPropsType) => (Array.isArray(sx) ? sx : [sx]);
