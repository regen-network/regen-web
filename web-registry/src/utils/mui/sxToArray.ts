import { SxProps, Theme } from '@mui/material';

type SxPropsType = SxProps<Theme>;

export const sxToArray = (sx?: SxPropsType): any[] =>
  Array.isArray(sx) ? sx : [sx];
