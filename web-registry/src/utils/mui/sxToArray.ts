/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SxProps, Theme } from '@mui/material';

type SxPropsType = SxProps<Theme>;

export const sxToArray = (sx?: SxPropsType) => (Array.isArray(sx) ? sx : [sx]);
