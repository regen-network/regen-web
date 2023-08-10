import { SxProps } from '@mui/material';

export const ELLIPSIS_COLUMN_WIDTH = '125px';

export const tableStyles = {
  rootOnlyTopBorder: {
    root: {
      borderRadius: 0,
      borderTopWidth: 1,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    } as SxProps,
  },
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
