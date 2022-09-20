import { SxProps } from '@mui/material';

export const ELLIPSIS_COLUMN_WIDTH = '125px';

export const tableStyles = {
  ellipsisColumn: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    maxWidth: ELLIPSIS_COLUMN_WIDTH,
  } as SxProps,
  ellipsisContentColumn: {
    whiteSpace: 'nowrap',
    display: 'block',
    maxWidth: ELLIPSIS_COLUMN_WIDTH,
    '& p': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  } as SxProps,
};
